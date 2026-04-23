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
