import { existsSync } from "node:fs";
import { join } from "node:path";
import { specdojoPackageRootDir } from "./package-paths.js";
import { specdojoRootDir } from "./specdojo-config.js";

const SPECDOJO_TEMPLATES_RELATIVE_DIR = "docs/ja/specdojo/templates";

export type TemplateResolutionRoots = {
  repositoryRoot?: string;
  packageRoot?: string;
};

// 利用者リポジトリの template を上書きとして優先し、無い場合だけ npm package に
// 同梱した原本へフォールバックする。両方に無い場合は調査できるよう探索元をすべて示す。
export function resolveSpecdojoTemplatePath(
  templateFileName: string,
  roots: TemplateResolutionRoots = {},
): string {
  const repositoryPath = join(
    roots.repositoryRoot ?? specdojoRootDir(),
    SPECDOJO_TEMPLATES_RELATIVE_DIR,
    templateFileName,
  );
  const bundledPath = join(
    roots.packageRoot ?? specdojoPackageRootDir(),
    SPECDOJO_TEMPLATES_RELATIVE_DIR,
    templateFileName,
  );

  if (existsSync(repositoryPath)) return repositoryPath;
  if (existsSync(bundledPath)) return bundledPath;

  throw new Error(
    `Template not found: ${templateFileName}\n` +
      `Searched repository template: ${repositoryPath}\n` +
      `Searched bundled package template: ${bundledPath}`,
  );
}
