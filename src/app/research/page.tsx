import { CompetitorTable } from "@/components/CompetitorTable";

const painPoints = [
  "热榜标题信息密度低，用户难以快速判断事件来龙去脉。",
  "观点和情绪混杂，用户需要区分事实、争议和立场。",
  "看完热点后常需要继续搜索，但平台缺少结构化 Query 引导。",
  "用户不感兴趣或觉得总结没用时，反馈很难影响后续推荐。",
];
const needs = [
  "30 秒理解热点背景和当前进展。",
  "看到不同观点与争议焦点，而不是单一结论。",
  "获得下一步可搜索的问题、关键词和实用关联。",
  "通过关注和负反馈影响推荐策略。",
];
const opportunities = [
  "在热榜和搜索结果之间增加一层 AI 理解，让用户先建立事件上下文。",
  "用意图 Schema 区分背景理解、原因追问、进展追踪、观点判断和实用关联。",
  "把相关搜索从标题相似升级为搜索路径推荐，帮助用户继续探索。",
  "把关注后续、不感兴趣、总结有用/没用转化为推荐加权和降权信号。",
];
const mappings = [
  { need: "快速理解", feature: "30秒看懂 + AI 一句话解释", value: "降低进入热点的认知成本", metric: "摘要有用率、详情页停留" },
  { need: "判断争议", feature: "争议焦点 + 观点分层 + 可信度提示", value: "减少情绪化内容带来的误读", metric: "争议模块展开率、负反馈率" },
  { need: "继续搜索", feature: "相关搜索推荐 + AI 追问", value: "把浏览热榜转化为搜索会话", metric: "相关搜索 CTR、追问率" },
  { need: "持续关注", feature: "关注后续 + 时间线", value: "支持热点进展追踪", metric: "关注后续率、回访率" },
  { need: "表达偏好", feature: "不感兴趣/有用/没用反馈", value: "形成推荐策略闭环", metric: "负反馈率、同类降权效果" },
];

export default function ResearchPage() {
  return (
    <div className="space-y-5">
      <section className="panel p-6">
        <p className="text-sm font-semibold text-brand">调研与竞品分析</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">从用户痛点出发定义热点消费产品机会</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          HotInsight 的机会不是复制热榜，而是在“看见热点”和“继续搜索”之间补齐 AI 理解、观点判断、搜索承接和反馈闭环。
        </p>
      </section>

      <section className="panel p-5">
        <h2 className="section-title">核心机会判断</h2>
        <p className="section-note">现有热榜解决“发现热点”，但没有很好解决“为什么值得看、我该怎么看、下一步搜什么”。</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <OpportunityCard title="百度热搜的缺口" text="搜索入口强，但热榜标题和结果页之间缺少结构化解释层。" />
          <OpportunityCard title="微博热搜的缺口" text="传播快，但信息噪声高，用户需要时间线和观点分层降低误读。" />
          <OpportunityCard title="HotInsight 的切入" text="用 AI 把热点消费拆成理解、判断、搜索、追踪和反馈，让推荐策略可迭代。" />
        </div>
      </section>

      <TwoColumn titleA="用户痛点" itemsA={painPoints} titleB="用户需求" itemsB={needs} />

      <section className="panel p-5">
        <h2 className="section-title">竞品分析表</h2>
        <p className="section-note">对比主流热榜产品的入口优势、体验不足和 HotInsight 可切入机会。</p>
        <div className="mt-4">
          <CompetitorTable />
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="section-title">产品机会点</h2>
        <p className="section-note">围绕 AI 摘要、意图路由、搜索推荐和反馈闭环建立差异化。</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {opportunities.map((item) => (
            <div key={item} className="rounded-lg border border-line bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="section-title">功能映射关系</h2>
        <p className="section-note">把需求映射到功能、产品价值和验证指标，体现从方案到迭代的闭环意识。</p>
        <div className="mt-4 grid gap-3">
          {mappings.map((item) => (
            <div key={item.need} className="grid gap-3 rounded-lg border border-line bg-white p-4 md:grid-cols-4">
              <div>
                <p className="text-xs text-muted">需求</p>
                <p className="mt-1 font-bold text-ink">{item.need}</p>
              </div>
              <div>
                <p className="text-xs text-muted">功能模块</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">{item.feature}</p>
              </div>
              <div>
                <p className="text-xs text-muted">产品价值</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.value}</p>
              </div>
              <div>
                <p className="text-xs text-muted">验证指标</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.metric}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function OpportunityCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-lg border border-line bg-slate-50 p-4">
      <h3 className="font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
    </article>
  );
}

function TwoColumn({ titleA, itemsA, titleB, itemsB }: { titleA: string; itemsA: string[]; titleB: string; itemsB: string[] }) {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <ListPanel title={titleA} items={itemsA} />
      <ListPanel title={titleB} items={itemsB} />
    </section>
  );
}

function ListPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="panel p-5">
      <h2 className="section-title">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <p key={item} className="rounded-lg border border-line bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
