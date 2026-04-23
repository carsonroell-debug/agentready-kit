import { AgentMetadata, AgentSection } from "@agentready/next";
import { getEntry, listDocs } from "@/lib/mdx";
import { Markdown } from "@/components/Markdown";
import { Sidebar } from "@/components/Sidebar";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  const docs = await listDocs();
  return docs.map((d) => ({ slug: d.path.replace("/docs/", "").split("/") }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const path = slug?.length ? `docs/${slug.join("/")}` : "docs/getting-started";
  const entry = await getEntry(path);
  if (!entry) notFound();

  const all = await listDocs();
  const idx = all.findIndex((d) => d.path === entry.path);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar currentPath={entry.path} />
      <div className="flex-1 px-6 py-8 md:py-12 min-w-0">
        <AgentMetadata
          title={entry.title}
          description={entry.description ?? undefined}
          url={entry.path}
          type="documentation"
        />
        <AgentSection
          purpose="documentation"
          summary={entry.description ?? undefined}
          className="max-w-3xl"
        >
          <Markdown>{entry.content}</Markdown>
        </AgentSection>

        {(prev || next) && (
          <nav className="max-w-3xl mt-12 pt-6 border-t border-brand-border grid grid-cols-2 gap-4 text-sm">
            {prev ? (
              <Link href={prev.path} className="flex items-center gap-2 group text-brand-muted hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                <span>
                  <span className="block text-[10px] uppercase tracking-wider">Previous</span>
                  <span className="text-white">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={next.path}
                className="flex items-center justify-end gap-2 group text-brand-muted hover:text-white text-right"
              >
                <span>
                  <span className="block text-[10px] uppercase tracking-wider">Next</span>
                  <span className="text-white">{next.title}</span>
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
