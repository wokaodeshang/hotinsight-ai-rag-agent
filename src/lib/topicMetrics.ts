import type { HotTopic, Sentiment, TopicCategory } from "@/data/hotTopics";

export type SortOption = "热度最高" | "上升最快" | "争议最高" | "搜索意图最强";

export const categories: Array<"全部" | TopicCategory> = ["全部", "社会", "娱乐", "科技", "财经", "体育"];

export const sortOptions: SortOption[] = ["热度最高", "上升最快", "争议最高", "搜索意图最强"];

export function getCategoryCounts(topics: HotTopic[]) {
  return topics.reduce<Record<TopicCategory, number>>(
    (acc, topic) => {
      acc[topic.category] += 1;
      return acc;
    },
    { 社会: 0, 娱乐: 0, 科技: 0, 财经: 0, 体育: 0 },
  );
}

export function getStrongestIntentCategory(topics: HotTopic[]) {
  const scores = topics.reduce<Record<TopicCategory, { total: number; count: number }>>(
    (acc, topic) => {
      acc[topic.category].total += topic.searchIntentScore;
      acc[topic.category].count += 1;
      return acc;
    },
    {
      社会: { total: 0, count: 0 },
      娱乐: { total: 0, count: 0 },
      科技: { total: 0, count: 0 },
      财经: { total: 0, count: 0 },
      体育: { total: 0, count: 0 },
    },
  );

  return (Object.entries(scores) as Array<[TopicCategory, { total: number; count: number }]>).sort(
    ([, a], [, b]) => b.total / Math.max(b.count, 1) - a.total / Math.max(a.count, 1),
  )[0][0];
}

export function getFastestGrowingTopic(topics: HotTopic[]) {
  return [...topics].sort((a, b) => b.growthRate - a.growthRate)[0];
}

export function getHomeMetrics(topics: HotTopic[]) {
  const averageHeat = Math.round(topics.reduce((sum, topic) => sum + topic.heatScore, 0) / topics.length);

  return {
    totalTopics: topics.length,
    averageHeat,
    strongestIntentCategory: getStrongestIntentCategory(topics),
    fastestGrowingTopic: getFastestGrowingTopic(topics).title,
  };
}

export function sortTopics(topics: HotTopic[], option: SortOption) {
  const scoreMap: Record<SortOption, (topic: HotTopic) => number> = {
    热度最高: (topic) => topic.heatScore,
    上升最快: (topic) => topic.growthRate,
    争议最高: (topic) => topic.controversyScore,
    搜索意图最强: (topic) => topic.searchIntentScore,
  };

  return [...topics].sort((a, b) => scoreMap[option](b) - scoreMap[option](a));
}

export function filterTopics(topics: HotTopic[], category: "全部" | TopicCategory) {
  if (category === "全部") {
    return topics;
  }

  return topics.filter((topic) => topic.category === category);
}

export function getSentimentCounts(topics: HotTopic[]) {
  return topics.reduce<Record<Sentiment, number>>(
    (acc, topic) => {
      acc[topic.sentiment] += 1;
      return acc;
    },
    { 正向: 0, 中性: 0, 负向: 0, 分歧: 0 },
  );
}

export function getTopTopics(topics: HotTopic[], key: "searchIntentScore" | "growthRate", limit = 5) {
  return [...topics].sort((a, b) => b[key] - a[key]).slice(0, limit);
}
