import { AgentMetadata, AgentSection } from "@agentready/next";
import { getEntry } from "@/lib/mdx";
import { Markdown } from "@/components/Markdown";
import { notFound } from "next/navigation";

export default async function Features() {
  const entry = await getEntry("features");
  if (!entry) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <AgentMetadata
        title={entry.title}
        description={entry.description ?? undefined}
        url="/features"
        type="article"
      />
      <AgentSection purpose="product-features" summary={entry.description ?? undefined}>
        <Markdown>{entry.content}</Markdown>
      </AgentSection>
    </div>
  );
}
