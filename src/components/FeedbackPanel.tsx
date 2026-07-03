"use client";

import { useState } from "react";
import { BellPlus, HeartOff, ThumbsDown, ThumbsUp } from "lucide-react";

const actions = [
  { label: "关注后续", icon: BellPlus, response: "已记录关注偏好，后续会提高该话题进展权重。" },
  { label: "不感兴趣", icon: HeartOff, response: "已降低相似话题推荐权重，并计入负反馈样本。" },
  { label: "总结有用", icon: ThumbsUp, response: "已标记摘要命中背景理解需求，可强化同类摘要模板。" },
  { label: "总结没用", icon: ThumbsDown, response: "已记录 BadCase：摘要可能过泛或缺少关键事实。" },
];

export function FeedbackPanel() {
  const [message, setMessage] = useState("反馈会影响后续推荐优先级、摘要模板和相关搜索召回策略。");

  return (
    <div className="panel p-5">
      <h2 className="section-title">互动反馈</h2>
      <p className="section-note">把用户点击转化为推荐策略信号，区分“继续追踪”“降低曝光”和“摘要质量”三类反馈。</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              onClick={() => setMessage(action.response)}
              className="flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm font-medium text-ink transition hover:border-ink hover:bg-slate-50"
            >
              <Icon size={16} />
              {action.label}
            </button>
          );
        })}
      </div>
      <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">{message}</p>
    </div>
  );
}
