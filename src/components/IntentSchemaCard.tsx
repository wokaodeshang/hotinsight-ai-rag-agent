import type { LucideIcon } from "lucide-react";

export function IntentSchemaCard({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) {
  return (
    <article className="rounded-lg border border-line bg-white p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-ink">
          <Icon size={17} />
        </span>
        <h3 className="font-bold text-ink">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
