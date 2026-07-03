"use client";

import { useMemo, useState } from "react";
import { Bot, Route, Send, UserRound } from "lucide-react";
import type { HotTopic } from "@/data/hotTopics";
import { presetQuestions } from "@/data/hotTopics";
import { getProductInsight } from "@/lib/productInsights";

const intentMap: Record<string, string> = {
  "这件事为什么上热搜？": "原因追问",
  "现在发展到哪一步？": "进展追踪",
  "有哪些争议？": "观点判断",
  "我还应该搜索什么？": "搜索扩展",
};

const moduleMap: Record<string, string> = {
  "这件事为什么上热搜？": "背景摘要 + 传播触发点 + 官方回应搜索",
  "现在发展到哪一步？": "事件时间线 + 最新节点 + 关注后续",
  "有哪些争议？": "争议焦点 + 多方观点 + 信息可信度",
  "我还应该搜索什么？": "相关 Query 扩展 + 实用关联 + 相似事件",
};

export function ChatMock({ topics }: { topics: HotTopic[] }) {
  const [topicId, setTopicId] = useState(topics[0].id);
  const [question, setQuestion] = useState(presetQuestions[0]);

  const activeTopic = useMemo(() => topics.find((topic) => topic.id === topicId) ?? topics[0], [topicId, topics]);
  const insight = getProductInsight(activeTopic);
  const answer = activeTopic.mockAnswers[question];

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <aside className="panel p-4">
        <h2 className="text-base font-bold text-ink">选择热点</h2>
        <p className="mt-1 text-sm leading-6 text-muted">左侧选择热点，右侧模拟 AI 基于摘要、时间线、争议和相关搜索进行意图路由。</p>
        <div className="mt-4 space-y-2">
          {topics.map((topic) => {
            const itemInsight = getProductInsight(topic);
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => {
                  setTopicId(topic.id);
                  setQuestion(presetQuestions[0]);
                }}
                className={`w-full rounded-lg border px-3 py-3 text-left transition ${
                  topic.id === activeTopic.id ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:bg-slate-50"
                }`}
              >
                <span className="block text-sm font-semibold">{topic.title}</span>
                <span className={`mt-1 block text-xs ${topic.id === activeTopic.id ? "text-white/75" : "text-muted"}`}>
                  {topic.category} · {itemInsight.lifecycleStage} · 主意图 {itemInsight.primaryIntent}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="panel flex min-h-[620px] flex-col">
        <div className="border-b border-line p-5">
          <p className="text-sm text-muted">当前热点</p>
          <h1 className="mt-1 text-xl font-bold text-ink">{activeTopic.title}</h1>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            <RouteNote label="识别主意图" value={insight.primaryIntent} />
            <RouteNote label="生命周期" value={insight.lifecycleStage} />
            <RouteNote label="信息状态" value={insight.informationStatus} />
          </div>
        </div>

        <div className="flex-1 space-y-5 p-5">
          <div className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-ink">
              <UserRound size={18} />
            </span>
            <div className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-ink">{question}</div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
              <Bot size={18} />
            </span>
            <div className="max-w-3xl rounded-lg border border-line bg-white px-4 py-4 text-sm leading-7 text-slate-700">
              <div className="space-y-2">
                {answer.split("\n").map((line) => {
                  const [label, ...rest] = line.split("：");
                  return (
                    <p key={line}>
                      <span className="font-semibold text-ink">{label}：</span>
                      {rest.join("：")}
                    </p>
                  );
                })}
              </div>
              <div className="mt-4 rounded-lg bg-slate-50 px-3 py-3 text-xs leading-5 text-slate-600">
                路由说明：命中「{intentMap[question]}」意图，匹配模块为「{moduleMap[question]}」。这一步模拟 Agent 先判断用户问题，再决定调用摘要、时间线、争议或搜索扩展模块。
              </div>
              <div className="mt-4 border-t border-line pt-4">
                <p className="font-semibold text-ink">推荐追问</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeTopic.suggestedQuestions.map((item) => (
                    <span key={item} className="rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-line p-5">
          <div className="flex flex-wrap gap-2">
            {presetQuestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setQuestion(item)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  question === item ? "bg-ink text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Send size={14} />
                {item}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
            意图识别结果：<span className="font-semibold text-ink">{intentMap[question]}</span>。候选标签包括背景理解、原因追问、进展追踪、观点判断、实用关联、搜索扩展、情绪反馈。
          </div>
        </div>
      </section>
    </div>
  );
}

function RouteNote({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
      <Route size={14} className="text-ocean" />
      <span>{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
