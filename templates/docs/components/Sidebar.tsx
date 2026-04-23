import Link from "next/link";
import { listDocs } from "@/lib/mdx";

export async function Sidebar({ currentPath }: { currentPath?: string }) {
  const docs = await listDocs();

  return (
    <aside className="w-60 shrink-0 border-r border-brand-border px-6 py-8 hidden md:block">
      <div className="text-[11px] uppercase tracking-wider text-brand-muted font-semibold mb-3">
        Documentation
      </div>
      <nav>
        <ul className="space-y-1">
          {docs.map((d) => {
            const active = currentPath === d.path;
            return (
              <li key={d.path}>
                <Link
                  href={d.path}
                  className={`block text-sm px-2 py-1.5 rounded-md ${
                    active
                      ? "bg-brand-accent/15 text-brand-accent"
                      : "text-brand-text hover:text-white hover:bg-brand-surface"
                  }`}
                >
                  {d.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
