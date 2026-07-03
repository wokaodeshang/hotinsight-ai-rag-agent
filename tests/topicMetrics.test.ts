import { describe, expect, it } from "vitest";

import { hotTopics } from "../src/data/hotTopics";
import {
  getCategoryCounts,
  getFastestGrowingTopic,
  getHomeMetrics,
  getStrongestIntentCategory,
  sortTopics,
} from "../src/lib/topicMetrics";

describe("hot topic data quality", () => {
  it("contains a broad Chinese hot topic mock set", () => {
    expect(hotTopics).toHaveLength(15);
    expect(new Set(hotTopics.map((topic) => topic.category))).toEqual(
      new Set(["社会", "娱乐", "科技", "财经", "体育"]),
    );
  });

  it("keeps every topic ready for detail, ask, and recommendation modules", () => {
    for (const topic of hotTopics) {
      expect(topic.keyPoints.length).toBeGreaterThanOrEqual(3);
      expect(topic.timeline.length).toBeGreaterThanOrEqual(3);
      expect(topic.viewpoints.length).toBeGreaterThanOrEqual(2);
      expect(topic.relatedQueries.length).toBeGreaterThanOrEqual(4);
      expect(topic.suggestedQuestions.length).toBeGreaterThanOrEqual(3);
      expect(topic.mockAnswers["这件事为什么上热搜？"]).toContain("背景");
    }
  });
});

describe("topic metrics", () => {
  it("derives home metrics from topic data", () => {
    const metrics = getHomeMetrics(hotTopics);

    expect(metrics.totalTopics).toBe(15);
    expect(metrics.averageHeat).toBeGreaterThan(70);
    expect(metrics.strongestIntentCategory).toBe(getStrongestIntentCategory(hotTopics));
    expect(metrics.fastestGrowingTopic).toBe(getFastestGrowingTopic(hotTopics).title);
  });

  it("counts categories and sorts topics by product ranking dimensions", () => {
    const counts = getCategoryCounts(hotTopics);
    const sortedByControversy = sortTopics(hotTopics, "争议最高");

    expect(Object.values(counts).reduce((sum, value) => sum + value, 0)).toBe(15);
    expect(sortedByControversy[0].controversyScore).toBeGreaterThanOrEqual(
      sortedByControversy[1].controversyScore,
    );
  });
});
