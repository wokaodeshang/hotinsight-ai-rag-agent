import type { HotTopic } from "@/data/hotTopics";

export type ProductInsight = {
  lifecycleStage: string;
  lifecycleReason: string;
  informationStatus: string;
  informationReason: string;
  primaryIntent: string;
  intentReason: string;
  recommendationReason: string;
  suggestedModule: string;
  riskSignal: string;
  metricBasis: Array<{ label: string; value: string; basis: string }>;
};

export const metricMethodology = [
  {
    label: "热度分",
    description: "由搜索增量、讨论密度、媒体扩散和站内曝光综合模拟，用来判断是否值得进入热点池。",
  },
  {
    label: "增长率",
    description: "模拟近 2 小时热度变化，识别爆发期热点，决定是否触发时间线更新和后续提醒。",
  },
  {
    label: "争议度",
    description: "结合正反观点分化、负反馈率和情绪标签，判断是否需要优先补充事实来源和多方观点。",
  },
  {
    label: "搜索意图分",
    description: "衡量用户是否会继续追问原因、进展、影响和相关搜索，决定 AI 问答与搜索建议的展示优先级。",
  },
];

export function getProductInsight(topic: HotTopic): ProductInsight {
  const lifecycle = getLifecycle(topic);
  const information = getInformationStatus(topic);
  const intent = getPrimaryIntent(topic);

  return {
    lifecycleStage: lifecycle.stage,
    lifecycleReason: lifecycle.reason,
    informationStatus: information.status,
    informationReason: information.reason,
    primaryIntent: intent.intent,
    intentReason: intent.reason,
    recommendationReason: getRecommendationReason(topic, intent.intent),
    suggestedModule: getSuggestedModule(topic, lifecycle.stage, intent.intent),
    riskSignal: getRiskSignal(topic),
    metricBasis: [
      {
        label: "热度分",
        value: `${topic.heatScore}/100`,
        basis: topic.heatScore >= 90 ? "已达到首页强曝光阈值，适合进入首屏推荐位。" : "适合进入分类流，观察是否继续增长。",
      },
      {
        label: "增长率",
        value: `${topic.growthRate > 0 ? "+" : ""}${topic.growthRate}%`,
        basis: topic.growthRate >= 40 ? "短时间增速高，优先补时间线和最新回应。" : "增速相对稳定，优先补背景解释和争议复盘。",
      },
      {
        label: "争议度",
        value: `${topic.controversyScore}/100`,
        basis: topic.controversyScore >= 75 ? "观点分化明显，需要呈现双方论点和信息缺口。" : "争议可控，可先突出事实摘要和实用影响。",
      },
      {
        label: "搜索意图",
        value: `${topic.searchIntentScore}/100`,
        basis: topic.searchIntentScore >= 85 ? "用户有明显继续搜索需求，应展示相关 Query 和 AI 追问。" : "更偏浏览型消费，可用摘要降低理解成本。",
      },
    ],
  };
}

function getLifecycle(topic: HotTopic) {
  if (topic.growthRate >= 45) {
    return { stage: "爆发期", reason: "热度短时间快速上升，用户最需要知道发生了什么和最新进展。" };
  }

  if (topic.controversyScore >= 75) {
    return { stage: "争议发酵期", reason: "讨论焦点从事实转向立场分歧，适合强化观点分层和可信度提示。" };
  }

  if (topic.searchIntentScore >= 85) {
    return { stage: "解释消费期", reason: "用户已经看见热点，但仍需要原因、影响和下一步搜索路径。" };
  }

  return { stage: "持续追踪期", reason: "热度仍在，但重点从爆发传播转向后续影响和信息补全。" };
}

function getInformationStatus(topic: HotTopic) {
  if (topic.controversyScore >= 80) {
    return { status: "多方说法并存", reason: "争议度高，单一摘要容易误导，需要保留不同观点和未确认信息。" };
  }

  if (topic.timeline.length >= 3 && topic.viewpoints.length >= 2) {
    return { status: "信息基本可复盘", reason: "已有时间线和观点分层，适合帮助用户快速建立上下文。" };
  }

  return { status: "信息仍待补全", reason: "事件节点不足，推荐先展示已确认事实并提示继续关注。" };
}

function getPrimaryIntent(topic: HotTopic) {
  if (topic.searchIntentScore >= 90 && topic.category === "科技") {
    return { intent: "实用关联", reason: "科技热点容易转化为体验对比、购买判断和隐私风险搜索。" };
  }

  if (topic.controversyScore >= 75) {
    return { intent: "观点判断", reason: "用户核心问题不是标题真假，而是不同立场为何分歧。" };
  }

  if (topic.growthRate >= 40) {
    return { intent: "进展追踪", reason: "增长快说明信息仍在流动，用户会追问最新回应和后续影响。" };
  }

  if (topic.searchIntentScore >= 85) {
    return { intent: "搜索扩展", reason: "标题只解决发现问题，用户仍需要更准确的 Query 继续搜索。" };
  }

  return { intent: "背景理解", reason: "适合先用低成本摘要建立事件上下文。" };
}

function getRecommendationReason(topic: HotTopic, intent: string) {
  return `推荐理由：${topic.category}类热点的主要承接意图是「${intent}」，当前热度 ${topic.heatScore}、增长 ${topic.growthRate}%、搜索意图 ${topic.searchIntentScore}，适合从“看见热点”引导到“理解和继续搜索”。`;
}

function getSuggestedModule(topic: HotTopic, lifecycleStage: string, intent: string) {
  if (intent === "观点判断") {
    return `优先展示争议焦点和信息可信度，避免用户只看到情绪化结论。`;
  }

  if (lifecycleStage === "爆发期") {
    return `优先展示事件时间线和最新节点，让用户快速判断是否值得关注后续。`;
  }

  if (intent === "实用关联") {
    return `优先展示适合谁、风险是什么、还应该搜索什么，承接真实决策需求。`;
  }

  return `优先展示 30 秒摘要和相关搜索，把热榜浏览转化为搜索会话。`;
}

function getRiskSignal(topic: HotTopic) {
  if (topic.negativeFeedbackRate >= 14) {
    return "负反馈偏高：需要检查摘要是否过泛、推荐词是否偏离用户真实意图。";
  }

  if (topic.controversyScore >= 75) {
    return "争议偏高：需要补充双方观点和事实边界，降低误读风险。";
  }

  if (topic.searchIntentScore >= 90) {
    return "搜索意图强：不要只给榜单排名，应提供追问、Query 扩展和后续提醒。";
  }

  return "风险可控：适合用摘要解释和轻量反馈验证用户兴趣。";
}
