import { DashboardCharts } from "@/components/DashboardCharts";
import { hotTopics } from "@/data/hotTopics";

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <section className="panel p-6">
        <p className="text-sm font-semibold text-brand">数据分析看板</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">从热点消费行为中抽取产品决策信号</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          看板展示类别结构、热度趋势、情绪分布、搜索意图和增长速度，用于判断哪些热点适合摘要解释、继续搜索或后续追踪。
        </p>
      </section>
      <DashboardCharts topics={hotTopics} />
    </div>
  );
}
