const competitors = [
  { name: "百度热搜", strength: "搜索入口强，覆盖社会和民生议题", limit: "榜单解释较弱，用户需要二次检索", chance: "在热搜下直接补 AI 摘要、争议和相关搜索" },
  { name: "微博热搜", strength: "传播速度快，娱乐和公共事件讨论活跃", limit: "情绪噪声高，事实链路不完整", chance: "加入时间线和观点分层，降低误读成本" },
  { name: "知乎热榜", strength: "长内容解释和观点质量较好", limit: "消费决策链路弱，实时性相对慢", chance: "把高质量解释拆成 30 秒理解和追问入口" },
  { name: "今日头条热榜", strength: "分发效率高，内容供给丰富", limit: "推荐偏内容消费，搜索扩展不突出", chance: "把用户反馈用于热点兴趣和负反馈降权" },
  { name: "小红书", strength: "消费经验和实用攻略强", limit: "公共热点结构化不足，难以快速判断事实", chance: "连接热点事件与实用关联搜索，例如出行、购买、避坑" },
];

export function CompetitorTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-slate-50 text-slate-600">
            <th className="px-4 py-3 font-semibold">竞品</th>
            <th className="px-4 py-3 font-semibold">优势</th>
            <th className="px-4 py-3 font-semibold">不足</th>
            <th className="px-4 py-3 font-semibold">HotInsight 机会</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((item) => (
            <tr key={item.name} className="border-b border-line last:border-b-0">
              <td className="px-4 py-4 font-bold text-ink">{item.name}</td>
              <td className="px-4 py-4 leading-6 text-slate-600">{item.strength}</td>
              <td className="px-4 py-4 leading-6 text-slate-600">{item.limit}</td>
              <td className="px-4 py-4 leading-6 text-slate-600">{item.chance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
