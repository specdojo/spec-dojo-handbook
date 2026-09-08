import path from "node:path";
import { fileURLToPath } from "node:url";

// このモジュールは開発時は src/、npm 配布時は dist/ 直下にある。
// どちらの場合もモジュールの親ディレクトリが SpecDojo package のルートになる。
export function specdojoPackageRootDir(): string {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}
