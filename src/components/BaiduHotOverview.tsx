import { ArrowUpRight, BadgeCheck, CircleAlert, Flame, Search, Sparkles, TrendingUp } from "lucide-react";
import type { BaiduHotItem } from "@/data/baiduHotSnapshot";
import { getBaiduHotSummary, getHotAction, getHotIntent, getHotRisk, type BaiduHotOverview } from "@/lib/baiduHot";

export function BaiduHotOverview({ overview }: { overview: BaiduHotOverview }) {
  const summary = getBaiduHotSummary(overview.items);
  const topItems = overview.items.slice(0, 20);
  const categoryCounts = getCategoryCounts(topItems);

  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch">
        <div className="panel p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-brand">今日百度热搜总览</p>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${overview.isLive ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
              {overview.isLive ? "实时抓取" : "快照兜底"}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
            把百度热搜实时榜转化为可理解、可搜索、可运营的热点总览
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            首页使用百度热搜实时榜作为原始信号，HotInsight 只做二次产品标注：识别类别、判断用户意图、给出搜索承接动作和风险提示。这样既保留真实热点，又展示热点产品经理如何把榜单转化为搜索体验策略。
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
            <a href={overview.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 font-medium text-ink">
              来源：{overview.sourceLabel}
              <ArrowUpRight size={15} />
            </a>
            <span className="rounded-lg bg-slate-50 px-3 py-2">采集时间：{overview.fetchedAt}</span>
            <span className="rounded-lg bg-slate-50 px-3 py-2">刷新策略：线上每 10 分钟尝试更新</span>
          </div>
        </div>
        <div className="panel flex flex-col justify-between p-6">
          <div>
            <p className="text-sm text-muted">产品判断</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">真实榜单不等于直接推荐</h2>
          </div>
          <div className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
            <p className="rounded-lg bg-slate-50 p-4">百度提供排名和热搜指数，HotInsight 负责判断用户下一步是要看背景、追进展、辨争议，还是继续搜索。</p>
            <p className="rounded-lg bg-slate-50 p-4">本页避免伪造增长率和争议度，只展示可解释的二次标注。</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <BaiduMetric label="榜单热点数" value={summary.total} detail="来自百度热搜实时榜 Top 列表，页面展示前 20 条。" icon={Flame} tone="brand" />
        <BaiduMetric label="最高热搜指数" value={formatHeat(summary.maxHeat)} detail="百度原始热搜指数，用于判断首屏强关注主题。" icon={TrendingUp} tone="ocean" />
        <BaiduMetric label="占比最高类别" value={summary.topCategory} detail="由 HotInsight 根据标题关键词做二次产品标注。" icon={Sparkles} tone="violet" />
        <BaiduMetric label="公共议题数量" value={summary.publicIssueCount} detail="时政、国际、民生、社会、辟谣类热点需要更强事实链路。" icon={CircleAlert} tone="amber" />
      </section>

      <section className="panel p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">今日热点结构</h2>
            <p className="section-note">先看今天榜单的主题分布，再决定首页应该优先展示解释、时间线、赛况还是辟谣信息。</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">HotInsight 二次标注</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {categoryCounts.map((item) => (
            <div key={item.category} className="rounded-lg border border-line bg-slate-50 p-4">
              <p className="text-sm font-bold text-ink">{item.category}</p>
              <p className="mt-2 text-2xl font-bold text-brand">{item.count}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{getCategoryAdvice(item.category)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="section-title">百度热搜榜单与 AI 搜索承接</h2>
          <p className="section-note">左侧保留百度原始排名和热搜指数，右侧展示 HotInsight 对用户意图、搜索动作和风险信号的产品判断。</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {topItems.map((item) => (
            <BaiduHotCard key={`${item.rank}-${item.title}`} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

function BaiduHotCard({ item }: { item: BaiduHotItem }) {
  const intent = getHotIntent(item);
  const action = getHotAction(item);
  const risk = getHotRisk(item);
  const searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(item.title)}`;

  return (
    <article className="panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-sm font-bold text-white">{item.rank}</span>
            <span className="rounded-md border border-line px-2 py-1 text-xs font-medium text-slate-600">{item.category}</span>
            {item.tag ? <span className="rounded-md bg-brand/10 px-2 py-1 text-xs font-semibold text-brand">{item.tag}</span> : null}
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">热搜指数 {formatHeat(item.heatIndex)}</span>
          </div>
          <h3 className="mt-4 text-lg font-bold leading-7 text-ink">{item.title}</h3>
        </div>
        <a href={searchUrl} target="_blank" rel="noreferrer" aria-label={`搜索${item.title}`} className="rounded-lg border border-line p-2 text-slate-500 transition hover:bg-slate-50 hover:text-ink">
          <Search size={18} />
        </a>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Signal label="用户意图" value={intent} />
        <Signal label="承接动作" value={action} />
        <Signal label="风险提示" value={risk} />
      </div>
    </article>
  );
}

function Signal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-slate-50 p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-ink">{value}</p>
    </div>
  );
}

function BaiduMetric({ label, value, detail, icon: Icon, tone }: { label: string; value: string | number; detail: string; icon: React.ElementType; tone: "brand" | "ocean" | "violet" | "amber" }) {
  const toneClass = {
    brand: "bg-brand/10 text-brand",
    ocean: "bg-ocean/10 text-ocean",
    violet: "bg-violet/10 text-violet",
    amber: "bg-amber/10 text-amber",
  }[tone];

  return (
    <article className="panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 text-2xl font-bold leading-8 text-ink">{value}</p>
        </div>
        <span className={`rounded-lg p-2 ${toneClass}`}>
          <Icon size={20} />
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{detail}</p>
    </article>
  );
}

function getCategoryCounts(items: BaiduHotItem[]) {
  const counts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

function getCategoryAdvice(category: string) {
  const map: Record<string, string> = {
    体育: "适合承接赛况、关键球员、后续赛程和情绪讨论。",
    时政: "适合补权威来源、背景解释和时间线。",
    国际: "适合补事实来源、地图背景和多方回应。",
    社会: "适合补事件经过、责任边界和后续处理。",
    辟谣: "适合突出来源可信度和错误信息澄清。",
    民生: "适合回答影响谁、怎么办、能否复用经验。",
    健康: "适合补专业解释、风险提示和实用建议。",
    科技: "适合补概念解释、用户影响和搜索扩展。",
    职业: "适合补政策解读、岗位影响和个人行动建议。",
    教育: "适合补申请条件、官方入口和时间节点。",
  };

  return map[category] ?? "适合从标题扩展到背景、进展和相关搜索。";
}

function formatHeat(value: number) {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}万`;
  }

  return value.toLocaleString("zh-CN");
}
