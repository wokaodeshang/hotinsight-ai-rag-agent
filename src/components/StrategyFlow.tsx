import { ArrowRight } from "lucide-react";

export function StrategyFlow({ steps }: { steps: string[] }) {
  return (
    <div className="panel p-5">
      <h2 className="section-title">用户热点消费路径</h2>
      <p className="section-note">把“看到热点”后的每一步都转化为可观测行为，用于理解、搜索和推荐闭环。</p>
      <div className="mt-5 grid gap-3 md:grid-cols-4 xl:grid-cols-7">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <div className="flex min-h-20 flex-1 items-center justify-center rounded-lg border border-line bg-slate-50 px-3 py-4 text-center text-sm font-semibold text-ink">
              {step}
            </div>
            {index < steps.length - 1 ? <ArrowRight className="hidden shrink-0 text-muted xl:block" size={18} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
