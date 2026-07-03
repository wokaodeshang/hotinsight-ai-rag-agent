import { ChatMock } from "@/components/ChatMock";
import { hotTopics } from "@/data/hotTopics";

export default function AskPage() {
  return (
    <div className="space-y-5">
      <section className="panel p-6">
        <p className="text-sm font-semibold text-brand">AI 热点问答</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">模拟热点 Agent 的意图识别、模块路由和搜索扩展</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          该页面不接真实大模型 API，而是用规则和 mock responses 展示产品逻辑：先识别用户是在问原因、进展、争议还是搜索扩展，再匹配摘要、时间线、争议焦点和相关 Query。
        </p>
      </section>
      <ChatMock topics={hotTopics} />
    </div>
  );
}

