import { scanContent, readContent } from "@agentready/next/server";
import config from "@/agentready.config";
import type { ContentEntry } from "@agentready/next";

export function getConfig() {
  return config;
}

export async function listEntries(): Promise<ContentEntry[]> {
  return scanContent(config);
}

export async function getEntry(path: string): Promise<ContentEntry | null> {
  return readContent(path, config);
}

export async function listDocs(): Promise<ContentEntry[]> {
  const entries = await listEntries();
  return entries
    .filter((e) => e.section === "docs")
    .sort((a, b) => {
      const orderA = (a.frontmatter.order as number | undefined) ?? 999;
      const orderB = (b.frontmatter.order as number | undefined) ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title);
    });
}
