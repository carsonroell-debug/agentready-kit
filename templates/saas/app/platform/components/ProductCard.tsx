import Link from "next/link";
import { Check } from "lucide-react";

interface ProductCardProps {
  label: string;
  title: string;
  body: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  accent: "blue" | "purple" | "green";
}

const accentClasses = {
  blue: "border-t-blue-500",
  purple: "border-t-violet-500",
  green: "border-t-emerald-500",
} as const;

const ctaClasses = {
  blue: "bg-blue-600 hover:bg-blue-700",
  purple: "bg-violet-600 hover:bg-violet-700",
  green: "bg-emerald-600 hover:bg-emerald-700",
} as const;

const labelClasses = {
  blue: "text-blue-400",
  purple: "text-violet-400",
  green: "text-emerald-400",
} as const;

export function ProductCard({ label, title, body, features, ctaText, ctaHref, accent }: ProductCardProps) {
  return (
    <div className={`card border-t-4 ${accentClasses[accent]} flex flex-col`}>
      <p className={`text-xs font-semibold uppercase tracking-wide ${labelClasses[accent]} mb-3`}>
        {label}
      </p>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-brand-text leading-relaxed flex-1">{body}</p>
      <ul className="mt-5 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-brand-text">
            <Check className="h-4 w-4 text-brand-accent mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        target={ctaHref.startsWith("http") ? "_blank" : undefined}
        rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
        className={`mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${ctaClasses[accent]}`}
      >
        {ctaText}
      </Link>
    </div>
  );
}
