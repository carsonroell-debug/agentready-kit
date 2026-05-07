"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is AgentReady?",
    a: "AgentReady is a platform of tools that help you understand and optimize how AI agents read and use your website. As AI-powered search, agents, and LLMs become the primary way people discover content, your site's AI-readiness matters as much as its SEO.",
  },
  {
    q: "How do the Scanner and MD This Page work together?",
    a: "The Scanner tells you how AI-ready your site is at a structural level — schema markup, content clarity, crawlability. MD This Page lets you go deeper: install the extension, visit any page, and press Alt+M to see the exact Markdown an AI agent would extract. Together, they give you the diagnostic view (Scanner) and the agent's-eye view (MD This Page).",
  },
  {
    q: "Is there a free tier?",
    a: "Yes. The Scanner offers a free scan on any URL — no account required. MD This Page is free for basic conversions. Pro ($9/month) unlocks unlimited scans, history, batch export, and priority support across both tools.",
  },
  {
    q: "What's in the AgentReady Kit?",
    a: "The Kit is a developer resource library for building AI-ready sites from scratch. It includes an llms.txt generator, structured data templates for common content types, AI sitemap configuration guides, and documentation on best practices for AI-readable web content. Pro subscribers get early access to new additions.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your account dashboard at any time. You'll retain access until the end of your billing period, with no penalties or hidden fees.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 border-t border-brand-border">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-white text-center mb-10">
          Questions? We've got answers.
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="card">
              <button
                className="w-full flex items-center justify-between text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-semibold text-white">{faq.q}</span>
                <span className="text-brand-muted text-lg select-none shrink-0">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <p className="mt-3 text-sm text-brand-text leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
