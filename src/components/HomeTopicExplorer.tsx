"use client";

import { useMemo, useState } from "react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { TopicCard } from "@/components/TopicCard";
import type { HotTopic, TopicCategory } from "@/data/hotTopics";
import type { SortOption } from "@/lib/topicMetrics";
import { filterTopics, sortTopics } from "@/lib/topicMetrics";
import { metricMethodology } from "@/lib/productInsights";

export function HomeTopicExplorer({ topics }: { topics: HotTopic[] }) {
  const [category, setCategory] = useState<"全部" | TopicCategory>("全部");
  const [sort, setSort] = useState<SortOption>("热度最高");

  const visibleTopics = useMemo(() => sortTopics(filterTopics(topics, category), sort), [category, sort, topics]);

  return (
    <section className="space-y-4">
      <div className="panel p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">指标不是装饰，而是推荐决策依据</h2>
            <p className="section-note">本 Demo 使用本地 mock 数据，重点展示热点产品如何把热榜信号转化为理解、搜索和反馈策略。</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">模拟指标说明</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {metricMethodology.map((item) => (
            <div key={item.label} className="rounded-lg border border-line bg-slate-50 p-4">
              <p className="text-sm font-bold text-ink">{item.label}</p>
              <p className="mt-2 text-xs leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <CategoryFilter
        selectedCategory={category}
        selectedSort={sort}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {visibleTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
}
