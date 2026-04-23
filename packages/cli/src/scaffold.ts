import { readFile, writeFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { downloadTemplate } from "giget";
import { execSync } from "node:child_process";
import type { TemplateDef } from "./templates";

export interface ScaffoldInput {
  template: TemplateDef;
  targetDir: string;
  projectName: string;
  packageManager: "npm" | "pnpm" | "yarn" | "bun";
  initGit: boolean;
  installDeps: boolean;
  /** Use local template path instead of fetching from GitHub (dev / monorepo mode). */
  localPath?: string;
}

export async function scaffold(input: ScaffoldInput): Promise<void> {
  const { template, targetDir, projectName, packageManager, initGit, installDeps, localPath } =
    input;

  if (localPath) {
    const { cpSync } = await import("node:fs");
    cpSync(localPath, targetDir, { recursive: true });
  } else {
    await downloadTemplate(template.source, {
      dir: targetDir,
      force: false,
    });
  }

  await rewriteProjectName(targetDir, projectName);

  if (initGit) {
    run("git init", targetDir);
    run("git add -A", targetDir);
    run('git commit -m "chore: scaffold from create-agentready-app" --quiet', targetDir);
  }

  if (installDeps) {
    const cmd =
      packageManager === "yarn"
        ? "yarn"
        : packageManager === "bun"
          ? "bun install"
          : `${packageManager} install`;
    run(cmd, targetDir);
  }
}

async function rewriteProjectName(dir: string, name: string): Promise<void> {
  const pkgPath = join(dir, "package.json");
  try {
    await stat(pkgPath);
  } catch {
    return;
  }
  const raw = await readFile(pkgPath, "utf8");
  const pkg = JSON.parse(raw) as { name?: string };
  pkg.name = name;
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}

function run(cmd: string, cwd: string): void {
  execSync(cmd, { cwd, stdio: "inherit" });
}
