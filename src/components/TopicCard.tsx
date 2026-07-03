import Link from "next/link";
import { ArrowUpRight, MessageSquareText, ShieldAlert, TrendingUp } from "lucide-react";
import type { HotTopic } from "@/data/hotTopics";
import { getProductInsight } from "@/lib/productInsights";

export function TopicCard({ topic }: { topic: HotTopic }) {
  const rankDelta = topic.previousRank - topic.rank;
  const insight = getProductInsight(topic);

  return (
    <Link href={`/topic/${topic.id}`} className="panel block p-5 transition hover:-translate-y-0.5 hover:shadow-panel">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-sm font-bold text-white">
              {topic.rank}
            </span>
            <span className="rounded-md border border-line px-2 py-1 text-xs font-medium text-slate-600">
              {topic.category}
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
              {insight.lifecycleStage}
            </span>
            <span className={`text-xs font-medium ${rankDelta >= 0 ? "text-brand" : "text-slate-500"}`}>
              {rankDelta >= 0 ? `上升 ${rankDelta}` : `下降 ${Math.abs(rankDelta)}`}
            </span>
          </div>
          <h2 className="mt-4 text-lg font-bold leading-7 text-ink">{topic.title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">{topic.aiSummary}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <InsightBlock label="产品判断" value={insight.primaryIntent} text={insight.intentReason} />
            <InsightBlock label="承接动作" value={insight.suggestedModule} text={insight.riskSignal} />
          </div>
        </div>
        <ArrowUpRight className="hidden text-slate-400 sm:block" size={20} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Score label="热度" value={topic.heatScore} />
        <Score label="增长率" value={`${topic.growthRate > 0 ? "+" : ""}${topic.growthRate}%`} icon={<TrendingUp size={14} />} />
        <Score label="争议度" value={topic.controversyScore} icon={<ShieldAlert size={14} />} />
        <Score label="搜索意图" value={topic.searchIntentScore} icon={<MessageSquareText size={14} />} />
      </div>
    </Link>
  );
}

function InsightBlock({ label, value, text }: { label: string; value: string; text: string }) {
  return (
    <div className="rounded-lg border border-line bg-white px-3 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-ink">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}

function Score({ label, value, icon }: { label: string; value: string | number; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-slate-50 px-3 py-2">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-ink">
        {icon}
        {value}
      </p>
    </div>
  );
}
