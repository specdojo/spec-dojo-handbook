import { describe, expect, it } from "vitest";
import { formatGitCommandFailure, summarizeGitArguments } from "../../src/exec-worktree.js";
import { sanitizeRegisterConclusion } from "../../src/exec-register.js";

describe("summarizeGitArguments", () => {
  it("keeps arguments as-is when there is no pathspec separator", () => {
    expect(summarizeGitArguments(["--no-renames", "--name-only", "-z"])).toBe(
      "--no-renames --name-only -z",
    );
  });

  it("replaces the pathspec after -- with its count", () => {
    const actual = summarizeGitArguments([
      "-m",
      "exec",
      "--",
      "docs/a.md",
      "docs/b.md",
      "docs/c.md",
    ]);

    expect(actual).toBe("-m exec -- 3 paths");
  });

  it("uses the singular form for a single pathspec", () => {
    expect(summarizeGitArguments(["--", "docs/a.md"])).toBe("-- 1 path");
  });

  it("abbreviates an argument longer than the per-argument limit", () => {
    const actual = summarizeGitArguments(["-m", "x".repeat(60)]);

    expect(actual).toBe(`-m ${"x".repeat(39)}…`);
  });
});

describe("formatGitCommandFailure", () => {
  it("puts the git stderr before the argument summary", () => {
    const actual = formatGitCommandFailure(
      ["commit", "-m", "exec(register PJR-TA5C): title", "--", "docs/a.md", "docs/b.md"],
      "error: cannot commit\n",
    );

    expect(actual).toBe(
      "git commit failed: error: cannot commit " +
        "(args: -m exec(register PJR-TA5C): title -- 2 paths)",
    );
  });

  it("omits the stderr section when git wrote nothing to stderr", () => {
    expect(formatGitCommandFailure(["rev-parse", "--short", "HEAD"], "  ")).toBe(
      "git rev-parse failed (args: --short HEAD)",
    );
  });

  it("keeps the whole stderr in the record limit even with many pathspec entries", () => {
    const paths = Array.from(
      { length: 40 },
      (_, index) => `docs/ja/projects/prj-0001/file-${index}.md`,
    );
    const stderr = "fatal: cannot lock ref 'HEAD': unable to create lock file .git/index.lock";

    const reason = sanitizeRegisterConclusion(
      `integrate failed: ${formatGitCommandFailure(["commit", "-m", "title", "--", ...paths], stderr)}`,
    );

    expect(reason).toContain(stderr);
    expect(reason).toContain("-- 40 paths");
  });
});
