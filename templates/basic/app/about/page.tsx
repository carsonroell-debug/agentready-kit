import { AgentMetadata, AgentSection } from "@agentready/next";
import { getEntry } from "@/lib/mdx";
import { Markdown } from "@/components/Markdown";
import { notFound } from "next/navigation";

export default async function AboutPage() {
  const entry = await getEntry("about");
  if (!entry) notFound();

  return (
    <>
      <AgentMetadata
        title={entry.title}
        description={entry.description ?? undefined}
        url="/about"
        type="article"
      />
      <AgentSection purpose="main-content" summary={entry.description ?? undefined}>
        <Markdown>{entry.content}</Markdown>
      </AgentSection>
    </>
  );
}
