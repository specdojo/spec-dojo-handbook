import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, describe, expect, it } from "vitest";

const fixtureDirectories: string[] = [];
const script = resolve("tools/grade/run-per-document.sh");

function makeFixture(): {
  root: string;
  fakeSpecdojo: string;
  stateFile: string;
  target: string;
} {
  const root = mkdtempSync(join(tmpdir(), "specdojo-grade-per-document-"));
  fixtureDirectories.push(root);
  const rulebooks = join(root, "docs/ja/specdojo/rulebooks");
  const target = join(rulebooks, "fixture-rulebook.md");
  const reference = join(rulebooks, "prj-overview-rulebook.md");
  const stateFile = join(root, "fake-apply-count.txt");
  const fakeSpecdojo = join(root, "fake-specdojo.mjs");

  mkdirSync(rulebooks, { recursive: true });
  const markdown = (id: string) =>
    `---\nspecdojo:\n  id: ${id}\n  type: rulebook\n  status: draft\n---\n\n# Fixture\n`;
  writeFileSync(target, markdown("specdojo:fixture-rulebook"));
  writeFileSync(reference, markdown("specdojo:prj-overview-rulebook"));
  writeFileSync(
    fakeSpecdojo,
    `#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const args = process.argv.slice(2);
const value = (option) => args[args.indexOf(option) + 1];
if (args[0] === "grade" && args[1] === "plan") {
  const out = value("--out");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, "fixture-grade-plan.md"), "executor plan\\n");
  writeFileSync(join(out, "fixture-grade-reporter-plan.md"), "reporter plan\\n");
  process.exit(0);
}
if (args[0] === "agent" && args[1] === "run") {
  const limiter = process.env.FAKE_RATE_LIMIT_FILE;
  if (limiter && existsSync(limiter)) {
    unlinkSync(limiter);
    process.exit(75);
  }
  const out = value("--out");
  mkdirSync(dirname(out), { recursive: true });
  const plan = readFileSync(value("--plan"), "utf8");
  writeFileSync(out, plan.includes("<grade_executor_output>")
    ? "{\\\"rubric\\\":\\\"fixture\\\",\\\"documents\\\":[]}\\n"
    : "[VIEWPOINT fixture]\\nLEVEL: 4\\n[END VIEWPOINT]\\n");
  process.exit(0);
}
if (args[0] === "grade" && args[1] === "apply") {
  const countPath = process.env.FAKE_STATE_FILE;
  const count = existsSync(countPath) ? Number(readFileSync(countPath, "utf8")) + 1 : 1;
  writeFileSync(countPath, String(count));
  const score = count === 1 ? 80 : count === 2 ? 100 : 95;
  const target = value("--path");
  writeFileSync(target,
    "---\\nspecdojo:\\n  id: specdojo:fixture-rulebook\\n  type: rulebook\\n  status: draft\\n" +
    "  grade:\\n    verdict: pass\\n    score: " + score +
    "\\n    findings: { blocker: 0, major: 0, minor: 0, note: 0 }\\n---\\n\\n# Fixture\\n");
  process.exit(0);
}
process.exit(1);
`,
  );
  chmodSync(fakeSpecdojo, 0o755);
  return { root, fakeSpecdojo, stateFile, target };
}

function runPipeline(
  fixture: ReturnType<typeof makeFixture>,
  extraEnv: Record<string, string> = {},
) {
  return spawnSync(
    "bash",
    [
      script,
      "--run-id",
      "fixture-run",
      "--kind",
      "rulebook",
      "--path",
      "docs/ja/specdojo/rulebooks/fixture-rulebook.md",
      "--specdojo-bin",
      fixture.fakeSpecdojo,
    ],
    {
      cwd: fixture.root,
      encoding: "utf8",
      env: { ...process.env, FAKE_STATE_FILE: fixture.stateFile, ...extraEnv },
    },
  );
}

afterEach(() => {
  for (const directory of fixtureDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("grade per-document pipeline", () => {
  it("runs all three stages for one document and skips it on resume", () => {
    const fixture = makeFixture();

    const first = runPipeline(fixture);
    expect(first.status, first.stderr).toBe(0);
    expect(readFileSync(fixture.stateFile, "utf8")).toBe("3");

    const results = readFileSync(
      join(fixture.root, "logs/grade/runs/per-document/fixture-run/results.tsv"),
      "utf8",
    );
    expect(results).toContain("\t1\tpassed\t");
    expect(results).toContain("\t2\tpassed\t");
    expect(results).toContain("\t3\tpassed\t");
    const stage2 = results.split("\n").find((line) => line.includes("\t2\tpassed\t"));
    expect(stage2?.split("\t").slice(5, 8)).toEqual(["pass", "100", "0"]);

    const resumed = runPipeline(fixture);
    expect(resumed.status, resumed.stderr).toBe(0);
    expect(resumed.stdout).toContain("resume skip document=");
    expect(readFileSync(fixture.stateFile, "utf8")).toBe("3");
  });

  it("leaves the current stage incomplete on rate limit and resumes it", () => {
    const fixture = makeFixture();
    const limiter = join(fixture.root, "rate-limit-once");
    writeFileSync(limiter, "1");

    const limited = runPipeline(fixture, { FAKE_RATE_LIMIT_FILE: limiter });
    expect(limited.status).toBe(75);
    expect(existsSync(fixture.stateFile)).toBe(false);

    const resumed = runPipeline(fixture, { FAKE_RATE_LIMIT_FILE: limiter });
    expect(resumed.status, resumed.stderr).toBe(0);
    expect(readFileSync(fixture.stateFile, "utf8")).toBe("3");
  });
});
