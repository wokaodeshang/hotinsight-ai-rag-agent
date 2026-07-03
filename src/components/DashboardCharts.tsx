"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { HotTopic } from "@/data/hotTopics";
import { getCategoryCounts, getSentimentCounts, getTopTopics } from "@/lib/topicMetrics";
import { getProductInsight } from "@/lib/productInsights";

const colors = ["#e23d28", "#0f766e", "#6d5dfc", "#b7791f", "#172033", "#64748b"];

export function DashboardCharts({ topics }: { topics: HotTopic[] }) {
  const categoryData = Object.entries(getCategoryCounts(topics)).map(([name, value]) => ({ name, value }));
  const trendData = topics[0].trend.map((point, index) => ({
    time: point.time,
    热度均值: Math.round(topics.reduce((sum, topic) => sum + topic.trend[index].heat, 0) / topics.length),
  }));
  const sentimentData = Object.entries(getSentimentCounts(topics)).map(([name, value]) => ({ name, value }));
  const intentTop = getTopTopics(topics, "searchIntentScore");
  const growthTop = getTopTopics(topics, "growthRate");
  const highIntentCount = topics.filter((topic) => topic.searchIntentScore >= 85).length;
  const highRiskCount = topics.filter((topic) => topic.controversyScore >= 75 || topic.negativeFeedbackRate >= 14).length;
  const followCandidate = [...topics].sort((a, b) => b.growthRate + b.followRate - (a.growthRate + a.followRate))[0];

  return (
    <div className="space-y-5">
      <section className="panel p-5">
        <h2 className="section-title">看板决策摘要</h2>
        <p className="section-note">把 mock 指标转化为产品动作，模拟热点团队每天看数据后如何调整推荐与搜索承接。</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <DecisionCard label="高搜索意图热点" value={`${highIntentCount} 个`} text="优先展示 AI 追问、相关 Query 和后续搜索路径。" />
          <DecisionCard label="高争议/高负反馈热点" value={`${highRiskCount} 个`} text="需要补充事实边界、双方观点，并观察总结没用率。" />
          <DecisionCard label="后续追踪候选" value={followCandidate.title} text={getProductInsight(followCandidate).suggestedModule} />
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartPanel
          title="不同类别热点数量"
          conclusion="产品结论：类别分布决定默认模块。社会/财经优先补实用影响，娱乐优先补观点分层，科技优先补体验对比。"
          action="下一步动作：为不同类别配置不同的相关搜索模板，而不是统一召回标题相似词。"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#0f766e" />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel
          title="热点热度趋势"
          conclusion="产品结论：热度上升期适合推送 30 秒摘要，平稳期更适合补充时间线和争议复盘。"
          action="下一步动作：当增长率超过 40% 时进入进展监控队列，自动提高“最新回应”搜索建议权重。"
        >
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="热度均值" stroke="#e23d28" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel
          title="情绪分布"
          conclusion="产品结论：分歧和负向情绪越高，AI 摘要越不能只给单一结论。"
          action="下一步动作：争议度高于 75 的热点默认展示信息可信度、双方观点和负反馈入口。"
        >
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={sentimentData} dataKey="value" nameKey="name" outerRadius={90} label>
                {sentimentData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel
          title="搜索意图强度 Top 5"
          conclusion="产品结论：意图分高的话题说明用户会继续搜索，不应只靠榜单排名承接。"
          action="下一步动作：Top 5 热点首屏增加 AI 追问和相关搜索，并记录点击率验证 Query 质量。"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={intentTop} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="title" width={120} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="searchIntentScore" fill="#6d5dfc" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel
          title="增长速度 Top 5"
          conclusion="产品结论：增长最快的话题通常处在爆发期，用户对最新节点更敏感。"
          action="下一步动作：对增长 Top 5 配置“关注后续”与时间线更新提醒，降低用户反复搜索成本。"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={growthTop}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="title" tick={{ fontSize: 10 }} interval={0} height={70} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="growthRate" fill="#b7791f" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>
    </div>
  );
}

function DecisionCard({ label, value, text }: { label: string; value: string; text: string }) {
  return (
    <div className="rounded-lg border border-line bg-slate-50 p-4">
      <p className="text-xs font-semibold text-muted">{label}</p>
      <p className="mt-2 text-lg font-bold leading-7 text-ink">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function ChartPanel({ title, conclusion, action, children }: { title: string; conclusion: string; action: string; children: React.ReactNode }) {
  return (
    <section className="panel p-5">
      <h2 className="section-title">{title}</h2>
      <div className="mt-4 h-[260px]">{children}</div>
      <div className="mt-4 space-y-2 rounded-lg bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
        <p>{conclusion}</p>
        <p className="font-medium text-ink">{action}</p>
      </div>
    </section>
  );
}
