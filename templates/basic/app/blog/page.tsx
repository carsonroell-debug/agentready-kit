import Link from "next/link";
import { AgentMetadata, AgentSection } from "@agentready/next";
import { listEntries } from "@/lib/mdx";

export default async function BlogIndex() {
  const entries = (await listEntries()).filter((e) => e.section === "blog");

  return (
    <>
      <AgentMetadata
        title="Blog"
        description={`${entries.length} posts.`}
        url="/blog"
        type="website"
      />
      <AgentSection purpose="article-listing">
        <h1 className="text-4xl font-semibold text-white">Blog</h1>
        <p className="text-brand-text mt-2">{entries.length} posts.</p>
        <ul className="mt-8 space-y-4">
          {entries.map((e) => (
            <li key={e.path}>
              <Link href={e.path} className="flex items-baseline justify-between gap-4 group">
                <span className="text-xl text-white group-hover:text-brand-accent">
                  {e.title}
                </span>
                <span className="text-xs text-brand-muted">~{e.tokenEstimate} tokens</span>
              </Link>
              {e.description && (
                <p className="text-sm text-brand-muted mt-1">{e.description}</p>
              )}
            </li>
          ))}
        </ul>
      </AgentSection>
    </>
  );
}
