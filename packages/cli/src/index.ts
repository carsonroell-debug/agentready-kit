import {
  cancel,
  confirm,
  intro,
  isCancel,
  note,
  outro,
  password,
  select,
  spinner,
  text,
} from "@clack/prompts";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import pc from "picocolors";
import { TEMPLATES, findTemplate, type TemplateDef } from "./templates";
import { verifyLicense } from "./license";
import { scaffold } from "./scaffold";

async function main() {
  intro(pc.bgBlue(pc.white(" AgentReady Kit ")));

  const argName = process.argv[2]?.startsWith("-") ? undefined : process.argv[2];

  const rawName = argName
    ? argName
    : await text({
        message: "Project name?",
        placeholder: "my-agent-ready-site",
        validate: (v) => (!v ? "Required" : undefined),
      });
  if (isCancel(rawName)) return cancel("Cancelled.");

  const projectName = slugify(String(rawName));
  const targetDir = resolve(process.cwd(), projectName);

  if (existsSync(targetDir)) {
    const overwrite = await confirm({
      message: `Directory ${pc.cyan(projectName)} exists — continue anyway?`,
      initialValue: false,
    });
    if (isCancel(overwrite) || !overwrite) return cancel("Cancelled.");
  }

  const templateId = (await select({
    message: "Template?",
    options: TEMPLATES.map((t) => ({
      value: t.id,
      label: `${t.label}${t.tier === "pro" ? pc.dim(" · Pro") : ""}`,
      hint: t.hint,
    })),
    initialValue: "basic",
  })) as string;
  if (isCancel(templateId)) return cancel("Cancelled.");

  const template = findTemplate(templateId)!;
  let licenseKey: string | undefined;

  if (template.tier === "pro") {
    const key = await password({
      message: `${template.label} requires a Pro license. Paste your key:`,
      validate: (v) => (!v?.startsWith("AR_") ? "Key should start with AR_" : undefined),
    });
    if (isCancel(key)) return cancel("Cancelled.");

    const s = spinner();
    s.start("Verifying license…");
    const valid = await verifyLicense(String(key), template.id);
    s.stop(valid ? pc.green("License valid") : pc.red("License invalid"));
    if (!valid) {
      note(
        `Buy at ${pc.cyan("https://agentready.tools/kit")} — your key is emailed on purchase.`,
        "Pro required",
      );
      return cancel("Cancelled.");
    }
    licenseKey = String(key);
  }

  const packageManager = (await select({
    message: "Package manager?",
    options: [
      { value: "npm", label: "npm" },
      { value: "pnpm", label: "pnpm" },
      { value: "yarn", label: "yarn" },
      { value: "bun", label: "bun" },
    ],
    initialValue: "npm",
  })) as "npm" | "pnpm" | "yarn" | "bun";
  if (isCancel(packageManager)) return cancel("Cancelled.");

  const installDeps = await confirm({ message: "Install dependencies?", initialValue: true });
  if (isCancel(installDeps)) return cancel("Cancelled.");

  const initGit = await confirm({ message: "Initialize git repo?", initialValue: true });
  if (isCancel(initGit)) return cancel("Cancelled.");

  const s = spinner();
  s.start(`Scaffolding ${pc.cyan(template.label)} → ${pc.cyan(projectName)}`);
  try {
    await scaffold({
      template,
      targetDir,
      projectName,
      packageManager,
      initGit: !!initGit,
      installDeps: !!installDeps,
      localPath: process.env.AGENTREADY_LOCAL_TEMPLATES
        ? resolve(process.env.AGENTREADY_LOCAL_TEMPLATES, template.id)
        : undefined,
    });
    s.stop(pc.green("Done"));
  } catch (e) {
    s.stop(pc.red("Failed"));
    note(String((e as Error).message), "Error");
    process.exit(1);
  }

  if (licenseKey) {
    note(pc.dim(`License key stored in .env.local as AGENTREADY_LICENSE`), "Pro");
  }

  outro(
    [
      `${pc.green("✓")} Ready in ${pc.cyan(projectName)}`,
      "",
      pc.dim("  cd ") + pc.cyan(projectName),
      installDeps ? "" : pc.dim("  ") + pc.cyan(`${packageManager} install`),
      pc.dim("  ") + pc.cyan(`${packageManager} run dev`),
      "",
      pc.dim("Then visit:"),
      pc.dim("  · http://localhost:3000              your site"),
      pc.dim("  · http://localhost:3000/llms.txt     agent index"),
      pc.dim("  · http://localhost:3000/agent-debug  crawler stats"),
    ]
      .filter(Boolean)
      .join("\n"),
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
