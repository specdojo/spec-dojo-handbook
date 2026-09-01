import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  readPromptFile,
  resolveAgentCommand,
  resolveAgentMember,
  writeAgentOutput,
} from "../../src/agent-run.js";
import type { ExecDefaultsConfig } from "../../src/exec-agent-config.js";
import type { MemberRoster, ProjectMember } from "../../src/specdojo-config.js";

function agentMember(overrides: Partial<ProjectMember> = {}): ProjectMember {
  return {
    nickname: "gemma-expert-executor",
    display_name: "Gemma Expert Executor",
    email: null,
    roles: ["ARC"],
    type: "agent",
    provider: "opencode",
    command: "opencode run --agent gemma-expert-executor",
    ...overrides,
  };
}

function roster(members: ProjectMember[]): MemberRoster {
  return { version: 1, project_id: "prj-0001", members };
}

describe("resolveAgentMember", () => {
  it("returns the agent whose nickname matches exactly", () => {
    const actual = resolveAgentMember(roster([agentMember()]), "gemma-expert-executor");

    expect(actual).toEqual({ member: agentMember() });
  });

  it("reports the nickname when no agent matches", () => {
    const actual = resolveAgentMember(roster([agentMember()]), "codex-expert-executor");

    expect(actual).toEqual({
      error: "--by agent nickname not found in pm-members.yaml: codex-expert-executor",
    });
  });

  it("refuses a human member so an agent nickname never resolves to a person", () => {
    const human = agentMember({ nickname: "arc", type: "human" });

    const actual = resolveAgentMember(roster([human]), "arc");

    expect(actual).toEqual({
      error: "--by agent nickname not found in pm-members.yaml: arc",
    });
  });

  it("refuses a disabled agent so a paused account is not silently used", () => {
    const disabled = agentMember({ disabled: true });

    const actual = resolveAgentMember(roster([disabled]), "gemma-expert-executor");

    expect(actual).toEqual({
      error: "--by agent is disabled in pm-members.yaml: gemma-expert-executor",
    });
  });

  it("reports the nickname when the roster is missing", () => {
    const actual = resolveAgentMember(null, "gemma-expert-executor");

    expect(actual).toEqual({
      error: "--by agent nickname not found in pm-members.yaml: gemma-expert-executor",
    });
  });
});

describe("resolveAgentCommand", () => {
  const execDefaults: ExecDefaultsConfig = {};

  it("returns the member's own command", () => {
    const actual = resolveAgentCommand(execDefaults, agentMember());

    expect(actual).toEqual({ command: "opencode run --agent gemma-expert-executor" });
  });

  it("reports the nickname when no command can be resolved", () => {
    const actual = resolveAgentCommand(execDefaults, agentMember({ command: undefined }));

    expect(actual).toEqual({
      error: "--by agent has no resolvable command: gemma-expert-executor",
    });
  });
});

describe("readPromptFile", () => {
  it("returns the plan contents", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "specdojo-agent-run-"));

    try {
      const plan = path.join(dir, "plan.md");
      await writeFile(plan, "# Grade this document\n", "utf8");

      expect(readPromptFile(plan)).toBe("# Grade this document\n");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("names the missing path so the caller can fix the argument", () => {
    const missing = path.join(tmpdir(), "specdojo-agent-run-missing", "plan.md");

    expect(() => readPromptFile(missing)).toThrow(/--plan not found: .*plan\.md/);
  });

  it("rejects an empty plan rather than sending a blank prompt to the agent", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "specdojo-agent-run-"));

    try {
      const plan = path.join(dir, "plan.md");
      await writeFile(plan, "   \n\n", "utf8");

      expect(() => readPromptFile(plan)).toThrow(/--plan is empty: .*plan\.md/);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("writeAgentOutput", () => {
  it("creates missing parent directories so --out can name a fresh run directory", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "specdojo-agent-run-"));

    try {
      const out = path.join(dir, "runs", "2026-09-01", "response.txt");

      const written = writeAgentOutput(out, "VERDICT: pass\n");

      expect(written).toBe(out);
      expect(await readFile(out, "utf8")).toBe("VERDICT: pass\n");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
