import { spawn } from "node:child_process";
import type { RateLimitDetection } from "./exec-agent-config.js";
import { normalizeAgentLimit, type AgentLimitKind, type AgentLimitSignal } from "./exec-limit.js";
import type { AgentProvider } from "./specdojo-config.js";

export type AgentRunResult = "success" | "rate_limit" | "failure";

export type AgentExecution = {
  result: AgentRunResult;
  exitCode: number | null;
  stdout: string;
  stderr: string;
  limit?: AgentLimitSignal;
};

export function isRateLimitError(
  exitCode: number | null,
  output: string,
  detection: RateLimitDetection | undefined,
): boolean {
  if (!detection) return false;
  // exit_codes is a standalone signal: an exact configured code identifies a rate limit
  // on its own. Keep this list minimal (see exec-defaults.yaml) since generic codes like 1
  // also mean ordinary failure.
  if (detection.exit_codes && exitCode !== null && detection.exit_codes.includes(exitCode)) {
    return true;
  }
  if (detection.stderr_patterns) {
    // `output` is the agent's combined stdout+stderr: some CLIs print the limit notice to
    // stdout, not stderr (e.g. claude's "You've hit your session limit"), so scanning stderr
    // alone misses it. By default a pattern only counts when the process also failed (non-zero
    // or null exit). A successful run (exit 0) that merely echoes the phrase — e.g. an agent
    // editing a file containing the literal text "rate limit" — is not a rate limit.
    const requireNonzeroExit = detection.stderr_requires_nonzero_exit ?? true;
    if (!requireNonzeroExit || exitCode !== 0) {
      const lower = output.toLowerCase();
      for (const pattern of detection.stderr_patterns) {
        if (lower.includes(pattern.toLowerCase())) return true;
      }
    }
  }
  return false;
}

/**
 * Spawn an agent command, feed `prompt` on stdin, and capture its output.
 *
 * stdout is piped (not inherited) so it can be scanned for rate-limit signals: some CLIs print
 * the limit notice to stdout, not stderr (e.g. claude's "session limit"). Each chunk is teed to
 * the parent's streams unless `quiet` is set, so live output and logging are preserved.
 */
export async function executeAgent(opts: {
  command: string;
  prompt: string;
  detection: RateLimitDetection | undefined;
  provider: AgentProvider | undefined;
  cooldownSeconds: Partial<Record<AgentLimitKind, number>> | undefined;
  cwd: string;
  env: NodeJS.ProcessEnv;
  // When the caller writes stdout to a file, teeing it to the parent would interleave the
  // agent's response with SpecDojo's own progress output on the same stream.
  quiet?: boolean;
}): Promise<AgentExecution> {
  if (!opts.command.trim()) {
    return { result: "failure", exitCode: null, stdout: "", stderr: "Empty agent command" };
  }

  const child = spawn(opts.command, {
    cwd: opts.cwd,
    env: opts.env,
    shell: true,
    stdio: ["pipe", "pipe", "pipe"],
  });
  // stdin を読まずに即終了するコマンドへの書き込みは EPIPE になる。未処理だと
  // プロセスごと落ちて失敗時の後処理（block 遷移・result 更新）が走らないため無視する。
  // 実行結果は終了コードで判定する。
  child.stdin.on("error", () => undefined);
  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (chunk: string) => {
    stdout += chunk;
    if (!opts.quiet) process.stdout.write(chunk);
  });
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (chunk: string) => {
    stderr += chunk;
    process.stderr.write(chunk);
  });
  child.stdin.end(opts.prompt);

  const exitCode = await new Promise<number | null>((resolveExit) => {
    child.once("error", (error) => {
      stderr += `${error.message}\n`;
      resolveExit(null);
    });
    child.once("close", (code) => resolveExit(code));
  });

  const combinedOutput = `${stdout}\n${stderr}`;
  if (isRateLimitError(exitCode, combinedOutput, opts.detection)) {
    return {
      result: "rate_limit",
      exitCode,
      stdout,
      stderr,
      limit: normalizeAgentLimit({
        output: combinedOutput,
        provider: opts.provider,
        cooldownSeconds: opts.cooldownSeconds,
      }),
    };
  }
  if (exitCode !== 0) {
    return { result: "failure", exitCode, stdout, stderr };
  }
  return { result: "success", exitCode: 0, stdout, stderr: "" };
}
