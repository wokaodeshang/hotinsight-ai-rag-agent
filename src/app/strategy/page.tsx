import { Brain, GitBranch, Lightbulb, MessageCircleQuestion, RefreshCw, Search, Target, TrendingUp } from "lucide-react";
import { IntentSchemaCard } from "@/components/IntentSchemaCard";
import { StrategyFlow } from "@/components/StrategyFlow";

const schema = [
  { title: "背景理解", description: "用户想知道事件是什么、涉及谁、为什么重要。", icon: Brain },
  { title: "原因追问", description: "用户追问上热搜原因、触发因素和传播节点。", icon: MessageCircleQuestion },
  { title: "进展追踪", description: "用户关心目前发展到哪一步、是否有官方回应。", icon: RefreshCw },
  { title: "观点判断", description: "用户希望理解争议双方、可信度和价值判断。", icon: Target },
  { title: "实用关联", description: "用户想知道对出行、消费、投资、工作等实际决策的影响。", icon: Lightbulb },
  { title: "搜索扩展", description: "用户需要下一步搜索词、相似事件和更精确的 Query。", icon: Search },
  { title: "情绪反馈", description: "用户通过关注、不感兴趣、有用或没用表达偏好。", icon: TrendingUp },
];

const badCases = [
  {
    issue: "AI 总结过泛",
    behavior: "用户看完摘要后继续搜索同类背景问题",
    reason: "摘要只复述热搜标题，缺少主体、时间、当前状态和影响范围",
    signal: "追问率高、总结没用率高、背景类 Query 重复出现",
    optimize: "把摘要拆成背景、触发点、当前进展、对用户影响四个槽位",
  },
  {
    issue: "相关搜索不够精准",
    behavior: "用户不点击推荐词，转而手动输入更具体 Query",
    reason: "召回词只按标题相似，未区分原因、进展、争议和实用关联",
    signal: "相关搜索 CTR 低、手动搜索改写率高",
    optimize: "按意图 Schema 生成 Query，并加入实体、时间、地域等约束",
  },
  {
    issue: "热点分类错误",
    behavior: "用户进入详情后快速退出，或在反馈中标记内容不相关",
    reason: "单标签分类忽略跨领域热点，例如科技政策同时影响财经消费",
    signal: "详情页停留短、同类推荐点击低、负反馈集中在分类流",
    optimize: "增加主类目和副类目，用点击后的纠偏反馈更新分类权重",
  },
  {
    issue: "不感兴趣仍重复推荐",
    behavior: "用户连续点击不感兴趣，但相似热点仍出现在首页",
    reason: "负反馈没有进入推荐公式，也没有对相似标题和意图做短期降权",
    signal: "同类负反馈率升高、关注后续率下降",
    optimize: "把不感兴趣计入负反馈项，并对相似类别、实体和意图降权",
  },
];

export default function StrategyPage() {
  return (
    <div className="space-y-5">
      <section className="panel p-6">
        <p className="text-sm font-semibold text-brand">意图路由与推荐策略</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">把 AI 能力迁移到热点搜索体验优化</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          该页展示产品实习生视角的策略设计：用户路径、意图 Schema、路由流程、推荐公式和 BadCase 归因。核心判断是：热度不等于推荐价值，推荐要看用户是否需要理解、判断、搜索和追踪。
        </p>
      </section>

      <StrategyFlow steps={["看到热点", "判断兴趣", "AI理解", "查看争议", "继续搜索", "关注后续", "反馈偏好"]} />

      <section className="panel p-5">
        <h2 className="section-title">用户意图 Schema</h2>
        <p className="section-note">把 Query 和点击行为映射为可路由的意图标签，让不同内容模块有明确触发条件。</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {schema.map((item) => (
            <IntentSchemaCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="section-title">意图路由流程</h2>
        <p className="section-note">从用户点击或提问开始，完成识别、匹配、生成、反馈和迭代。</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {[
            "用户点击/提问",
            "意图识别",
            "匹配内容模块",
            "生成解释或搜索建议",
            "收集反馈",
            "迭代推荐",
          ].map((step, index) => (
            <div key={step} className="rounded-lg border border-line bg-slate-50 p-4">
              <span className="text-xs font-semibold text-brand">STEP {index + 1}</span>
              <p className="mt-2 text-sm font-bold text-ink">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="section-title">推荐优先级公式</h2>
        <p className="section-note">公式强调热度不等于推荐，增长、兴趣、搜索意图和负反馈都会改变排序。</p>
        <div className="mt-4 rounded-lg border border-line bg-slate-50 p-5 text-base font-semibold leading-8 text-ink">
          推荐分 = 热度分 * 0.35 + 增长速度 * 0.25 + 用户兴趣匹配 * 0.20 + 搜索意图强度 * 0.15 - 负反馈 * 0.05
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <p className="rounded-lg bg-white p-4 text-sm leading-7 text-slate-600">解释：高热度只决定“是否值得看”，搜索意图决定“如何承接”，负反馈决定“是否继续推荐”。</p>
          <p className="rounded-lg bg-white p-4 text-sm leading-7 text-slate-600">应用：当争议度和负反馈升高时，系统应先补信息可信度和观点分层，而不是继续加曝光。</p>
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="section-title">BadCase 归因闭环</h2>
        <p className="section-note">把用户负反馈拆解为可观测信号和可执行优化，体现推荐策略迭代能力。</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-xs text-muted">
                <th className="border-b border-line px-3 py-3">BadCase</th>
                <th className="border-b border-line px-3 py-3">用户表现</th>
                <th className="border-b border-line px-3 py-3">可能原因</th>
                <th className="border-b border-line px-3 py-3">识别信号</th>
                <th className="border-b border-line px-3 py-3">优化策略</th>
              </tr>
            </thead>
            <tbody>
              {badCases.map((item) => (
                <tr key={item.issue} className="align-top">
                  <td className="border-b border-line px-3 py-4 font-bold text-ink">
                    <span className="flex items-center gap-2"><GitBranch size={15} className="text-ocean" />{item.issue}</span>
                  </td>
                  <td className="border-b border-line px-3 py-4 leading-6 text-slate-600">{item.behavior}</td>
                  <td className="border-b border-line px-3 py-4 leading-6 text-slate-600">{item.reason}</td>
                  <td className="border-b border-line px-3 py-4 leading-6 text-slate-600">{item.signal}</td>
                  <td className="border-b border-line px-3 py-4 leading-6 text-slate-600">{item.optimize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
