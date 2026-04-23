import { AgentMetadata, AgentSection } from "@agentready/next";
import { getEntry, listEntries } from "@/lib/mdx";
import { Markdown } from "@/components/Markdown";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const entries = (await listEntries()).filter((e) => e.section === "blog");
  return entries.map((e) => ({ slug: e.path.replace("/blog/", "") }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntry(`blog/${slug}`);
  if (!entry) notFound();

  return (
    <>
      <AgentMetadata
        title={entry.title}
        description={entry.description ?? undefined}
        url={entry.path}
        type="article"
        datePublished={(entry.frontmatter.date as string | undefined) ?? undefined}
      />
      <AgentSection
        purpose="main-content"
        summary={entry.description ?? undefined}
        className="py-8"
      >
        <Markdown>{entry.content}</Markdown>
      </AgentSection>
    </>
  );
}
