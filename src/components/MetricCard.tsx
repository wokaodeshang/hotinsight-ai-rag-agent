import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
  tone?: "brand" | "ocean" | "violet" | "amber";
};

const toneClass = {
  brand: "bg-red-50 text-brand",
  ocean: "bg-teal-50 text-ocean",
  violet: "bg-violet-50 text-violet",
  amber: "bg-amber-50 text-amber",
};

export function MetricCard({ label, value, detail, icon: Icon, tone = "brand" }: MetricCardProps) {
  return (
    <article className="panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneClass[tone]}`}>
          <Icon size={20} />
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-500">{detail}</p>
    </article>
  );
}
