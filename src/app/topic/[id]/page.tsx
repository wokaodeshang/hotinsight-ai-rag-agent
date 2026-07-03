import { notFound } from "next/navigation";
import { AlertTriangle, Gauge, MessageSquare, Search, ShieldCheck, TrendingUp } from "lucide-react";
import { FeedbackPanel } from "@/components/FeedbackPanel";
import { hotTopics } from "@/data/hotTopics";
import { getProductInsight } from "@/lib/productInsights";

export function generateStaticParams() {
  return hotTopics.map((topic) => ({ id: topic.id }));
}

export default async function TopicDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = hotTopics.find((item) => item.id === id);

  if (!topic) {
    notFound();
  }

  const insight = getProductInsight(topic);

  return (
    <div className="space-y-5">
      <section className="panel p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-ink px-3 py-1 text-sm font-semibold text-white">#{topic.rank}</span>
              <span className="rounded-md border border-line px-3 py-1 text-sm text-slate-600">{topic.category}</span>
              <span className="rounded-md bg-slate-100 px-3 py-1 text-sm text-slate-600">情绪：{topic.sentiment}</span>
              <span className="rounded-md bg-slate-100 px-3 py-1 text-sm text-slate-600">{insight.lifecycleStage}</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-ink">{topic.title}</h1>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">{topic.aiSummary}</p>
            <p className="mt-3 max-w-3xl rounded-lg bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
              {insight.recommendationReason}
            </p>
          </div>
          <div className="grid min-w-full grid-cols-2 gap-3 sm:min-w-[420px]">
            <DetailStat label="热度" value={topic.heatScore} icon={Gauge} basis={insight.metricBasis[0].basis} />
            <DetailStat label="增长率" value={`${topic.growthRate > 0 ? "+" : ""}${topic.growthRate}%`} icon={TrendingUp} basis={insight.metricBasis[1].basis} />
            <DetailStat label="争议度" value={topic.controversyScore} icon={AlertTriangle} basis={insight.metricBasis[2].basis} />
            <DetailStat label="搜索意图" value={topic.searchIntentScore} icon={Search} basis={insight.metricBasis[3].basis} />
          </div>
        </div>
      </section>

      <InfoModule title="产品解读" note="把单个热点拆成阶段、可信度、主意图和承接动作，模拟热点产品经理判断推荐策略的过程。">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <InsightCard title="热点生命周期" value={insight.lifecycleStage} text={insight.lifecycleReason} />
          <InsightCard title="信息可信度" value={insight.informationStatus} text={insight.informationReason} icon="shield" />
          <InsightCard title="主用户意图" value={insight.primaryIntent} text={insight.intentReason} />
          <InsightCard title="页面承接策略" value="模块优先级" text={insight.suggestedModule} />
        </div>
      </InfoModule>

      <InfoModule title="30秒看懂" note="面向“背景理解”意图，把长内容压缩为三到四个可扫读要点。">
        <ul className="grid gap-3 md:grid-cols-3">
          {topic.keyPoints.map((point) => (
            <li key={point} className="rounded-lg border border-line bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              {point}
            </li>
          ))}
        </ul>
      </InfoModule>

      <InfoModule title="事件时间线" note="帮助用户判断事件进展，减少只看单条热搜标题导致的上下文缺失。">
        <div className="space-y-3">
          {topic.timeline.map((item) => (
            <div key={`${item.time}-${item.event}`} className="flex gap-4 rounded-lg border border-line bg-white p-4">
              <span className="w-24 shrink-0 text-sm font-semibold text-brand">{item.time}</span>
              <p className="text-sm leading-6 text-slate-700">{item.event}</p>
            </div>
          ))}
        </div>
      </InfoModule>

      <InfoModule title="争议焦点" note="对应“观点判断”意图，分层展示不同立场，并说明争议为什么影响推荐策略。">
        <div className="mb-3 rounded-lg bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          {insight.riskSignal}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {topic.viewpoints.map((viewpoint) => (
            <article key={viewpoint.side} className="rounded-lg border border-line bg-white p-4">
              <h3 className="font-bold text-ink">{viewpoint.side}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{viewpoint.summary}</p>
            </article>
          ))}
        </div>
      </InfoModule>

      <InfoModule title="相关搜索推荐" note="把热点理解自然延伸到搜索行为，模拟 Query 扩展和搜索建议召回。">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topic.relatedQueries.map((query) => (
            <div key={query} className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-3 text-sm font-medium text-ink">
              <Search size={15} className="text-muted" />
              {query}
            </div>
          ))}
        </div>
      </InfoModule>

      <InfoModule title="AI 推荐追问" note="根据当前话题的摘要、争议和搜索意图生成下一步问题，提升连续探索效率。">
        <div className="grid gap-3 md:grid-cols-3">
          {topic.suggestedQuestions.map((question) => (
            <div key={question} className="flex items-center gap-3 rounded-lg border border-line bg-white p-4 text-sm font-semibold text-ink">
              <MessageSquare size={16} className="text-ocean" />
              {question}
            </div>
          ))}
        </div>
      </InfoModule>

      <FeedbackPanel />
    </div>
  );
}

function DetailStat({ label, value, icon: Icon, basis }: { label: string; value: string | number; icon: React.ElementType; basis: string }) {
  return (
    <div className="rounded-lg border border-line bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Icon size={16} />
        {label}
      </div>
      <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{basis}</p>
    </div>
  );
}

function InsightCard({ title, value, text, icon }: { title: string; value: string; text: string; icon?: "shield" }) {
  return (
    <article className="rounded-lg border border-line bg-white p-4">
      <div className="flex items-center gap-2">
        {icon === "shield" ? <ShieldCheck size={16} className="text-ocean" /> : <Gauge size={16} className="text-brand" />}
        <p className="text-xs font-semibold text-muted">{title}</p>
      </div>
      <h3 className="mt-2 text-base font-bold text-ink">{value}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </article>
  );
}

function InfoModule({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="panel p-5">
      <h2 className="section-title">{title}</h2>
      <p className="section-note">{note}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
