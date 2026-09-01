import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { type Command } from "commander";
import { executeAgent, type AgentExecution } from "./agent-process.js";
import {
  defaultExecDefaultsPath,
  loadExecDefaultsConfig,
  resolveMemberCommand,
  resolveRateLimitDetection,
  resolveRateLimitPolicy,
  type ExecDefaultsConfig,
} from "./exec-agent-config.js";
import { resolveProjectPaths } from "./exec-project.js";
import { loadRosterForExecutionPath } from "./exec-run.js";
import { gitEnvironment } from "./git-environment.js";
import { specdojoRootDir, type MemberRoster, type ProjectMember } from "./specdojo-config.js";

// A rate limit is not an ordinary failure: the caller (e.g. a per-document grade loop) must be
// able to stop and resume later rather than record the document as evaluated. Give it a distinct
// exit code so shell scripts can branch on it without parsing output.
export const AGENT_RUN_RATE_LIMIT_EXIT_CODE = 75;

export function resolveAgentMember(
  roster: MemberRoster | null,
  nickname: string,
): { member: ProjectMember } | { error: string } {
  const member = roster?.members.find((m) => m.type === "agent" && m.nickname === nickname);
  if (!member) {
    return { error: `--by agent nickname not found in pm-members.yaml: ${nickname}` };
  }
  if (member.disabled) {
    return { error: `--by agent is disabled in pm-members.yaml: ${nickname}` };
  }
  return { member };
}

export function resolveAgentCommand(
  execDefaults: ExecDefaultsConfig,
  member: ProjectMember,
): { command: string } | { error: string } {
  let command: string | undefined;
  try {
    command = resolveMemberCommand(execDefaults, member);
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
  if (!command) {
    return { error: `--by agent has no resolvable command: ${member.nickname}` };
  }
  return { command };
}

export function readPromptFile(planPath: string): string {
  const absolute = resolve(planPath);
  if (!existsSync(absolute)) {
    throw new Error(`--plan not found: ${planPath}`);
  }
  const prompt = readFileSync(absolute, "utf8");
  if (!prompt.trim()) {
    throw new Error(`--plan is empty: ${planPath}`);
  }
  return prompt;
}

export function writeAgentOutput(outPath: string, stdout: string): string {
  const absolute = resolve(outPath);
  mkdirSync(dirname(absolute), { recursive: true });
  writeFileSync(absolute, stdout, "utf8");
  return absolute;
}

export async function runAgentPlan(opts: {
  planPath: string;
  nickname: string;
  outPath?: string;
  project?: string;
  execDefaultsPath?: string;
  dryRun?: boolean;
}): Promise<{ execution?: AgentExecution; command: string; actor: string }> {
  const prompt = readPromptFile(opts.planPath);
  const resolved = resolveProjectPaths({ project: opts.project });
  const roster = loadRosterForExecutionPath(resolved.executionPath);
  const baseDir = specdojoRootDir();

  const memberResult = resolveAgentMember(roster, opts.nickname);
  if ("error" in memberResult) throw new Error(memberResult.error);
  const { member } = memberResult;

  const execDefaults = loadExecDefaultsConfig(opts.execDefaultsPath ?? defaultExecDefaultsPath());
  const commandResult = resolveAgentCommand(execDefaults, member);
  if ("error" in commandResult) throw new Error(commandResult.error);
  const { command } = commandResult;

  if (opts.dryRun) {
    process.stdout.write(`${command}\n`);
    return { command, actor: member.nickname };
  }

  const execution = await executeAgent({
    command,
    prompt,
    detection: resolveRateLimitDetection(execDefaults, member.provider),
    provider: member.provider,
    cooldownSeconds: resolveRateLimitPolicy(execDefaults, member.provider)?.cooldown_seconds,
    cwd: baseDir,
    env: { ...process.env, ...gitEnvironment() },
    // Writing the response to a file means the parent's stdout is reserved for progress
    // reporting; teeing the agent output there would interleave the two.
    quiet: opts.outPath !== undefined,
  });

  return { execution, command, actor: member.nickname };
}

export function registerAgentCommand(program: Command): void {
  const agent = program.command("agent").description("Run a plan with a specific agent");

  agent
    .command("run")
    .description("Feed a plan to one agent and capture its stdout")
    .requiredOption("--plan <path>", "Plan file passed to the agent on stdin")
    .requiredOption("--by <nickname>", "Agent nickname defined in pm-members.yaml")
    .option("--out <path>", "Write the agent stdout to this file instead of the terminal")
    .option("--project <projectId>", "Project id in specdojo.config.json")
    .option("--exec-defaults <path>", "Override the exec-defaults.yaml path")
    .option("--dry-run", "Print the resolved command without executing", false)
    .action(async (options) => {
      try {
        const { execution, command, actor } = await runAgentPlan({
          planPath: options.plan,
          nickname: options.by,
          outPath: options.out,
          project: options.project,
          execDefaultsPath: options.execDefaults,
          dryRun: options.dryRun,
        });
        if (!execution) return;

        if (options.out) {
          const written = writeAgentOutput(options.out, execution.stdout);
          process.stdout.write(`Wrote agent stdout: ${written}\n`);
        }

        if (execution.result === "rate_limit") {
          process.stderr.write(
            `rate limit: ${actor} (${command})` +
              `${execution.limit?.resume_at ? ` resume_at=${execution.limit.resume_at}` : ""}\n`,
          );
          process.exitCode = AGENT_RUN_RATE_LIMIT_EXIT_CODE;
          return;
        }
        if (execution.result === "failure") {
          process.stderr.write(`agent failed: ${actor} exit=${execution.exitCode ?? "null"}\n`);
          process.exitCode = 1;
        }
      } catch (error) {
        process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
        process.exitCode = 1;
      }
    });
}
