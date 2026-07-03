export type TopicCategory = "社会" | "娱乐" | "科技" | "财经" | "体育";

export type Sentiment = "正向" | "中性" | "负向" | "分歧";

export type TrendPoint = {
  time: string;
  heat: number;
};

export type TimelineItem = {
  time: string;
  event: string;
};

export type Viewpoint = {
  side: string;
  summary: string;
};

export type MockAnswers = Record<string, string>;

export type HotTopic = {
  id: string;
  title: string;
  category: TopicCategory;
  rank: number;
  previousRank: number;
  heatScore: number;
  growthRate: number;
  controversyScore: number;
  sentiment: Sentiment;
  searchIntentScore: number;
  trend: TrendPoint[];
  aiSummary: string;
  keyPoints: string[];
  timeline: TimelineItem[];
  viewpoints: Viewpoint[];
  relatedQueries: string[];
  suggestedQuestions: string[];
  mockAnswers: MockAnswers;
  followRate: number;
  negativeFeedbackRate: number;
};

const questions = [
  "这件事为什么上热搜？",
  "现在发展到哪一步？",
  "有哪些争议？",
  "我还应该搜索什么？",
];

function answer(topic: string, reason: string, next: string): MockAnswers {
  return {
    [questions[0]]: `背景：${topic}在短时间内集中触发公众关注。\n触发原因：${reason}\n产品判断：用户不是只想知道“上榜了”，而是在追问它为什么和自己有关。系统应优先展示传播触发点、影响范围和权威回应。\n后续搜索建议：事件起因、官方回应、时间线复盘。`,
    [questions[1]]: `背景：目前信息已经从爆发期进入持续跟进期。\n当前状态：多方回应、平台讨论和媒体报道正在补全细节。\n产品判断：此时用户需要判断“还有没有新变化”，时间线和关注后续按钮应优先展示。\n后续搜索建议：最新回应、处理进展、后续影响。`,
    [questions[2]]: `背景：争议主要来自不同用户对事实、责任和价值判断的分歧。\n分歧来源：信息不完整、利益相关方表态不同、平台传播放大情绪。\n产品判断：AI 不应直接替用户站队，而应拆出争议焦点、双方理由和仍待确认的信息。\n后续搜索建议：争议焦点、双方观点、专家解读。`,
    [questions[3]]: `背景：单看热榜标题容易形成碎片化理解。\n搜索路径：先查背景和时间线，再查争议和实际影响，最后查同类事件或行动建议。\n产品判断：相关搜索应该按“原因、进展、影响、决策”分层，而不是只按标题相似召回。\n后续搜索建议：${next}`,
  };
}

export const hotTopics: HotTopic[] = [
  {
    id: "city-commute-voucher",
    title: "多地试点通勤补贴引发年轻人关注",
    category: "社会",
    rank: 1,
    previousRank: 8,
    heatScore: 96,
    growthRate: 42,
    controversyScore: 67,
    sentiment: "分歧",
    searchIntentScore: 91,
    trend: [
      { time: "08:00", heat: 58 },
      { time: "10:00", heat: 70 },
      { time: "12:00", heat: 84 },
      { time: "14:00", heat: 96 },
    ],
    aiSummary: "通勤补贴从政策新闻变成了职场福利、城市生活成本和求职选择的综合搜索需求。",
    keyPoints: ["多地发布试点方案，覆盖地铁、公交和长距离通勤人群。", "用户主要关心申领门槛、补贴额度和是否影响企业福利。", "争议集中在财政公平、城市间差异和执行成本。"],
    timeline: [
      { time: "昨日 19:00", event: "地方媒体披露首批试点城市名单。" },
      { time: "今日 09:30", event: "社交平台出现大量“通勤成本”讨论。" },
      { time: "今日 13:20", event: "相关部门回应申领细则仍在制定。" },
    ],
    viewpoints: [
      { side: "支持者", summary: "认为补贴能降低年轻人生活压力，并提升公共交通使用率。" },
      { side: "质疑者", summary: "担心补贴覆盖不均，远郊和灵活就业人群反而被遗漏。" },
    ],
    relatedQueries: ["通勤补贴怎么申请", "哪些城市有通勤补贴", "公司交通补贴标准", "通勤时间劳动法规定"],
    suggestedQuestions: ["这会影响租房选择吗？", "哪些人最可能受益？", "企业需要承担成本吗？"],
    mockAnswers: answer("通勤补贴试点", "它同时击中了城市生活成本、公共服务和年轻人就业选择三个高频关注点。", "“通勤补贴申请条件”“城市交通补贴政策”“远郊通勤成本”"),
    followRate: 32,
    negativeFeedbackRate: 9,
  },
  {
    id: "ai-phone-agent",
    title: "国产手机发布 AI 生活助理模式",
    category: "科技",
    rank: 2,
    previousRank: 5,
    heatScore: 94,
    growthRate: 31,
    controversyScore: 54,
    sentiment: "中性",
    searchIntentScore: 95,
    trend: [
      { time: "08:00", heat: 66 },
      { time: "10:00", heat: 78 },
      { time: "12:00", heat: 88 },
      { time: "14:00", heat: 94 },
    ],
    aiSummary: "AI 手机从参数竞争转向任务代理，用户搜索重点是能不能真正替代手动操作。",
    keyPoints: ["新模式可跨应用完成订票、整理日程和购物比价。", "发布会演示强调端侧模型和隐私权限控制。", "用户最关心真实可用性、误操作和不同 App 适配。"],
    timeline: [
      { time: "昨日 20:00", event: "新品发布会展示 AI 助理连续任务能力。" },
      { time: "今日 10:10", event: "数码博主发布首批体验视频。" },
      { time: "今日 12:40", event: "应用权限和数据安全讨论升温。" },
    ],
    viewpoints: [
      { side: "乐观观点", summary: "认为 Agent 能把手机交互从点按升级为目标驱动。" },
      { side: "保守观点", summary: "认为演示场景过窄，真实环境仍依赖生态适配。" },
    ],
    relatedQueries: ["AI 手机助理怎么用", "端侧大模型安全吗", "手机 Agent 和语音助手区别", "AI 手机值得买吗"],
    suggestedQuestions: ["这个功能适合哪些用户？", "它和传统语音助手有什么区别？", "隐私风险在哪里？"],
    mockAnswers: answer("国产手机 AI 生活助理", "新品把大模型能力包装成可感知的日常任务，容易引发换机和体验搜索。", "“手机 Agent 实测”“端侧 AI 隐私”“AI 手机购买建议”"),
    followRate: 45,
    negativeFeedbackRate: 7,
  },
  {
    id: "drama-finale-debate",
    title: "年度悬疑剧大结局评分两极化",
    category: "娱乐",
    rank: 3,
    previousRank: 2,
    heatScore: 89,
    growthRate: 12,
    controversyScore: 88,
    sentiment: "分歧",
    searchIntentScore: 83,
    trend: [
      { time: "08:00", heat: 82 },
      { time: "10:00", heat: 86 },
      { time: "12:00", heat: 90 },
      { time: "14:00", heat: 89 },
    ],
    aiSummary: "剧集热度进入解释型消费阶段，用户不只找评分，更想理解结局、伏笔和争议。",
    keyPoints: ["大结局播出后评分出现高低分集中。", "争议点包括开放式结尾、人物动机和改编取舍。", "搜索需求从追剧转向剧情解析和二刷线索整理。"],
    timeline: [
      { time: "昨晚 22:00", event: "大结局上线并登上视频平台热榜。" },
      { time: "今日 00:30", event: "豆瓣和短视频平台出现大量结局解析。" },
      { time: "今日 11:00", event: "主创回应开放式结尾设计。" },
    ],
    viewpoints: [
      { side: "好评", summary: "认为结尾保留想象空间，人物弧光完整。" },
      { side: "差评", summary: "认为铺垫不足，关键反转缺少合理解释。" },
    ],
    relatedQueries: ["悬疑剧结局解析", "大结局谁是真凶", "原著结局区别", "悬疑剧伏笔整理"],
    suggestedQuestions: ["结局到底讲了什么？", "评分为什么两极化？", "有哪些伏笔值得回看？"],
    mockAnswers: answer("年度悬疑剧大结局", "剧集本身有高关注基础，大结局又制造了强解释需求和观点对立。", "“结局解析”“原著对比”“伏笔清单”"),
    followRate: 28,
    negativeFeedbackRate: 14,
  },
  {
    id: "coffee-price-war",
    title: "连锁咖啡价格战进入 6 元时代",
    category: "财经",
    rank: 4,
    previousRank: 12,
    heatScore: 87,
    growthRate: 48,
    controversyScore: 61,
    sentiment: "中性",
    searchIntentScore: 88,
    trend: [
      { time: "08:00", heat: 42 },
      { time: "10:00", heat: 61 },
      { time: "12:00", heat: 76 },
      { time: "14:00", heat: 87 },
    ],
    aiSummary: "咖啡价格战把消费决策、品牌利润和门店体验串到一起，形成强比价搜索。",
    keyPoints: ["多个品牌推出限时券和会员价。", "消费者关注低价是否影响品质和配送门槛。", "行业讨论转向门店盈利和供应链承压。"],
    timeline: [
      { time: "昨日 18:00", event: "头部品牌发放大额优惠券。" },
      { time: "今日 09:00", event: "用户晒出 6 元咖啡订单截图。" },
      { time: "今日 12:30", event: "财经媒体分析低价策略可持续性。" },
    ],
    viewpoints: [
      { side: "消费者", summary: "低价提升尝鲜意愿，但担心活动结束后价格回弹。" },
      { side: "行业侧", summary: "价格战能扩大规模，却可能压缩加盟商利润。" },
    ],
    relatedQueries: ["6元咖啡怎么买", "咖啡优惠券入口", "咖啡价格战原因", "连锁咖啡加盟利润"],
    suggestedQuestions: ["低价咖啡还能持续多久？", "消费者应该囤券吗？", "哪些品牌受影响最大？"],
    mockAnswers: answer("连锁咖啡价格战", "低价直接影响用户购买决策，也牵动品牌竞争和门店盈利讨论。", "“咖啡优惠券”“价格战可持续吗”“咖啡品牌对比”"),
    followRate: 36,
    negativeFeedbackRate: 8,
  },
  {
    id: "football-youth-final",
    title: "青少年足球决赛绝杀刷屏",
    category: "体育",
    rank: 5,
    previousRank: 20,
    heatScore: 84,
    growthRate: 55,
    controversyScore: 39,
    sentiment: "正向",
    searchIntentScore: 72,
    trend: [
      { time: "08:00", heat: 30 },
      { time: "10:00", heat: 48 },
      { time: "12:00", heat: 69 },
      { time: "14:00", heat: 84 },
    ],
    aiSummary: "体育高光片段带动情绪传播，进一步引发校园体育和青训体系搜索。",
    keyPoints: ["决赛补时阶段完成绝杀，短视频传播迅速。", "球员背景和学校训练体系成为用户关注点。", "讨论从单场比赛延伸到青少年体育教育。"],
    timeline: [
      { time: "昨日 21:00", event: "比赛结束，绝杀片段被球迷剪辑传播。" },
      { time: "今日 08:20", event: "学校官方账号发布幕后训练视频。" },
      { time: "今日 13:00", event: "体育媒体采访主教练和绝杀球员。" },
    ],
    viewpoints: [
      { side: "正向传播", summary: "认为这是校园体育长期投入的成果。" },
      { side: "理性提醒", summary: "提醒不要把个体高光过度包装成商业流量。" },
    ],
    relatedQueries: ["青少年足球决赛回放", "绝杀球员是谁", "校园足球政策", "青训怎么报名"],
    suggestedQuestions: ["这场比赛为什么破圈？", "球员未来发展怎样？", "校园足球有哪些机会？"],
    mockAnswers: answer("青少年足球决赛绝杀", "高情绪视频、青春叙事和体育教育议题叠加，推动热度快速上升。", "“比赛回放”“球员采访”“校园足球青训”"),
    followRate: 41,
    negativeFeedbackRate: 5,
  },
  {
    id: "battery-recycle-rule",
    title: "动力电池回收新规征求意见",
    category: "科技",
    rank: 6,
    previousRank: 10,
    heatScore: 82,
    growthRate: 24,
    controversyScore: 58,
    sentiment: "中性",
    searchIntentScore: 86,
    trend: [
      { time: "08:00", heat: 60 },
      { time: "10:00", heat: 68 },
      { time: "12:00", heat: 78 },
      { time: "14:00", heat: 82 },
    ],
    aiSummary: "新规把新能源车售后、二手车估值和环保责任连在一起，搜索意图偏实用。",
    keyPoints: ["征求意见稿强调溯源、检测和梯次利用。", "车主关注旧车电池残值和回收渠道。", "企业关注合规成本和回收网络建设。"],
    timeline: [
      { time: "昨日 17:00", event: "主管部门发布征求意见稿。" },
      { time: "今日 09:40", event: "新能源车主社区讨论电池残值。" },
      { time: "今日 12:10", event: "券商研报解读回收产业链影响。" },
    ],
    viewpoints: [
      { side: "环保视角", summary: "规范回收能降低污染风险，提升资源再利用效率。" },
      { side: "成本视角", summary: "车企和回收企业需要承担更高检测、运输和合规成本。" },
    ],
    relatedQueries: ["动力电池回收价格", "新能源车电池残值", "电池回收新规全文", "梯次利用是什么意思"],
    suggestedQuestions: ["新规对车主有什么影响？", "回收价格会涨吗？", "哪些公司受益？"],
    mockAnswers: answer("动力电池回收新规", "政策与新能源车消费后市场直接相关，用户会追问成本、残值和安全。", "“电池回收价格”“新能源二手车估值”“梯次利用政策”"),
    followRate: 34,
    negativeFeedbackRate: 6,
  },
  {
    id: "tourism-heatwave-refund",
    title: "高温天气下避暑游退改规则被热议",
    category: "社会",
    rank: 7,
    previousRank: 7,
    heatScore: 80,
    growthRate: 18,
    controversyScore: 73,
    sentiment: "分歧",
    searchIntentScore: 89,
    trend: [
      { time: "08:00", heat: 68 },
      { time: "10:00", heat: 73 },
      { time: "12:00", heat: 79 },
      { time: "14:00", heat: 80 },
    ],
    aiSummary: "极端天气把旅游消费从种草转向风险判断，退改、保险和目的地选择搜索增加。",
    keyPoints: ["多地发布高温预警，部分户外项目调整开放时间。", "游客集中询问酒店、门票和机票退改规则。", "争议在于天气风险应由平台、商家还是用户承担。"],
    timeline: [
      { time: "昨日 16:00", event: "气象部门发布连续高温预警。" },
      { time: "今日 09:00", event: "旅游平台客服量上升。" },
      { time: "今日 13:30", event: "多家景区公布限流和退票安排。" },
    ],
    viewpoints: [
      { side: "用户侧", summary: "认为极端天气属于不可控因素，应降低退改成本。" },
      { side: "商家侧", summary: "认为部分服务已预留资源，全面免费退改会造成经营压力。" },
    ],
    relatedQueries: ["高温旅游可以退票吗", "酒店不可取消怎么办", "旅游保险高温赔吗", "避暑游目的地推荐"],
    suggestedQuestions: ["我该不该取消行程？", "哪些退改规则最关键？", "还能搜索哪些避暑方案？"],
    mockAnswers: answer("高温避暑游退改", "它直接影响暑期出行消费决策，用户需要具体规则和替代方案。", "“酒店退改规则”“景区高温退票”“避暑城市推荐”"),
    followRate: 39,
    negativeFeedbackRate: 10,
  },
  {
    id: "idol-concert-refund",
    title: "演唱会二次开票与退票规则争议",
    category: "娱乐",
    rank: 8,
    previousRank: 4,
    heatScore: 78,
    growthRate: -8,
    controversyScore: 82,
    sentiment: "负向",
    searchIntentScore: 80,
    trend: [
      { time: "08:00", heat: 86 },
      { time: "10:00", heat: 84 },
      { time: "12:00", heat: 80 },
      { time: "14:00", heat: 78 },
    ],
    aiSummary: "票务争议正在从粉丝情绪扩散到平台规则、实名制和消费者权益。",
    keyPoints: ["二次开票数量和座位分布引发讨论。", "部分用户质疑退票手续费和候补机制不透明。", "平台回应称将优化票务信息披露。"],
    timeline: [
      { time: "昨日 12:00", event: "二次开票开启后迅速售罄。" },
      { time: "昨日 18:30", event: "用户晒出票档和座位争议截图。" },
      { time: "今日 10:20", event: "票务平台发布规则说明。" },
    ],
    viewpoints: [
      { side: "粉丝", summary: "希望开票、退票和候补规则更透明。" },
      { side: "平台", summary: "强调实名制和风控需要平衡体验与防黄牛。" },
    ],
    relatedQueries: ["演唱会二次开票规则", "实名制退票手续费", "候补票成功率", "票务平台投诉入口"],
    suggestedQuestions: ["二次开票为什么有争议？", "平台规则哪里不透明？", "消费者如何维权？"],
    mockAnswers: answer("演唱会二次开票争议", "票务稀缺、粉丝情绪和平台规则叠加，形成强烈的解释与维权搜索。", "“退票手续费规则”“候补票机制”“票务投诉流程”"),
    followRate: 30,
    negativeFeedbackRate: 18,
  },
  {
    id: "index-fund-fee-cut",
    title: "多只指数基金宣布降费",
    category: "财经",
    rank: 9,
    previousRank: 15,
    heatScore: 76,
    growthRate: 27,
    controversyScore: 44,
    sentiment: "正向",
    searchIntentScore: 84,
    trend: [
      { time: "08:00", heat: 55 },
      { time: "10:00", heat: 62 },
      { time: "12:00", heat: 70 },
      { time: "14:00", heat: 76 },
    ],
    aiSummary: "基金降费把宏观市场新闻转化为个人投资成本计算和产品比较需求。",
    keyPoints: ["头部基金公司下调管理费和托管费。", "投资者关注持有成本、同类产品差异和是否需要转换。", "市场解读为被动投资竞争加剧。"],
    timeline: [
      { time: "昨日 20:20", event: "多家公司发布降费公告。" },
      { time: "今日 09:30", event: "开盘后相关基金讨论升温。" },
      { time: "今日 12:00", event: "理财社区出现费用对比表。" },
    ],
    viewpoints: [
      { side: "投资者", summary: "费用降低有利于长期持有收益。" },
      { side: "分析师", summary: "降费不能替代资产配置判断，仍需关注跟踪误差。" },
    ],
    relatedQueries: ["指数基金降费名单", "基金管理费怎么算", "ETF和联接基金区别", "低费率基金推荐"],
    suggestedQuestions: ["降费对收益影响多大？", "我需要换基金吗？", "哪些指标比费率更重要？"],
    mockAnswers: answer("指数基金降费", "它直接影响投资者成本，容易触发产品比较和持仓决策搜索。", "“指数基金费率对比”“ETF 跟踪误差”“基金是否需要转换”"),
    followRate: 26,
    negativeFeedbackRate: 4,
  },
  {
    id: "smart-home-privacy",
    title: "智能家居摄像头隐私设置被集中讨论",
    category: "科技",
    rank: 10,
    previousRank: 13,
    heatScore: 73,
    growthRate: 15,
    controversyScore: 76,
    sentiment: "负向",
    searchIntentScore: 90,
    trend: [
      { time: "08:00", heat: 60 },
      { time: "10:00", heat: 67 },
      { time: "12:00", heat: 71 },
      { time: "14:00", heat: 73 },
    ],
    aiSummary: "隐私担忧推动用户从围观转向排查自己的设备设置，实用搜索意图很强。",
    keyPoints: ["社交平台流传摄像头权限设置教程。", "用户关注云存储、共享账号和默认密码风险。", "厂商强调固件更新和双重验证。"],
    timeline: [
      { time: "昨日 23:00", event: "隐私设置帖被大量转发。" },
      { time: "今日 09:10", event: "多品牌客服回应安全设置问题。" },
      { time: "今日 14:00", event: "网络安全专家发布排查建议。" },
    ],
    viewpoints: [
      { side: "用户", summary: "希望设备默认更安全，减少复杂设置。" },
      { side: "厂商", summary: "认为用户也需要开启强密码和隐私模式。" },
    ],
    relatedQueries: ["摄像头隐私设置", "智能家居云存储安全吗", "摄像头默认密码怎么改", "家庭网络安全检查"],
    suggestedQuestions: ["我该检查哪些设置？", "云存储有风险吗？", "哪些设备需要关闭权限？"],
    mockAnswers: answer("智能家居摄像头隐私", "它把抽象安全议题转成家庭设备自查任务，搜索意图非常明确。", "“摄像头隐私模式”“修改默认密码”“家庭网络安全清单”"),
    followRate: 44,
    negativeFeedbackRate: 11,
  },
  {
    id: "marathon-lottery",
    title: "城市马拉松中签率再创新低",
    category: "体育",
    rank: 11,
    previousRank: 9,
    heatScore: 70,
    growthRate: 6,
    controversyScore: 52,
    sentiment: "中性",
    searchIntentScore: 74,
    trend: [
      { time: "08:00", heat: 66 },
      { time: "10:00", heat: 68 },
      { time: "12:00", heat: 71 },
      { time: "14:00", heat: 70 },
    ],
    aiSummary: "马拉松热度体现了城市活动消费，用户会继续搜索报名、训练和替代赛事。",
    keyPoints: ["热门城市赛事报名人数大幅超过名额。", "跑者关注中签规则、公益名额和候补机制。", "城市文旅热度也随赛事讨论上升。"],
    timeline: [
      { time: "昨日 15:00", event: "赛事组委会公布抽签结果。" },
      { time: "今日 08:30", event: "未中签跑者讨论候补和替代赛事。" },
      { time: "今日 11:45", event: "酒店和交通预订价格被关注。" },
    ],
    viewpoints: [
      { side: "跑者", summary: "希望提高名额透明度和候补效率。" },
      { side: "城市运营", summary: "赛事热度有助于带动文旅消费，但组织压力增加。" },
    ],
    relatedQueries: ["马拉松中签率", "马拉松候补规则", "公益名额怎么报名", "马拉松训练计划"],
    suggestedQuestions: ["为什么越来越难中签？", "没中签还能参加什么赛事？", "参赛成本包括哪些？"],
    mockAnswers: answer("城市马拉松中签率", "运动生活方式和城市文旅消费叠加，让赛事结果成为持续搜索入口。", "“马拉松候补”“替代赛事”“跑步训练计划”"),
    followRate: 22,
    negativeFeedbackRate: 7,
  },
  {
    id: "new-energy-insurance",
    title: "新能源车险续保价格波动引讨论",
    category: "财经",
    rank: 12,
    previousRank: 11,
    heatScore: 69,
    growthRate: 4,
    controversyScore: 69,
    sentiment: "分歧",
    searchIntentScore: 87,
    trend: [
      { time: "08:00", heat: 63 },
      { time: "10:00", heat: 65 },
      { time: "12:00", heat: 68 },
      { time: "14:00", heat: 69 },
    ],
    aiSummary: "车险续保让新能源车消费进入使用成本阶段，用户搜索偏比价和原因解释。",
    keyPoints: ["部分车主反馈续保报价上涨或差异明显。", "影响因素包括车型维修成本、出险记录和地区差异。", "用户希望获得更透明的报价解释。"],
    timeline: [
      { time: "昨日 21:00", event: "车主社区出现续保报价对比帖。" },
      { time: "今日 09:20", event: "保险从业者解释定价因素。" },
      { time: "今日 13:10", event: "媒体汇总不同车型续保案例。" },
    ],
    viewpoints: [
      { side: "车主", summary: "认为同车型报价差异大，缺乏透明解释。" },
      { side: "保险侧", summary: "认为维修成本和风险模型导致价格分化。" },
    ],
    relatedQueries: ["新能源车险为什么贵", "车险续保怎么比价", "新能源车维修成本", "车险报价影响因素"],
    suggestedQuestions: ["我的车险为什么涨价？", "怎么判断报价是否合理？", "哪些车型保费更稳定？"],
    mockAnswers: answer("新能源车险续保价格", "它直接影响车主年度成本，且报价差异会引发强烈解释需求。", "“车险比价”“新能源维修成本”“续保报价规则”"),
    followRate: 31,
    negativeFeedbackRate: 12,
  },
  {
    id: "school-meal-transparency",
    title: "校园餐透明化平台上线",
    category: "社会",
    rank: 13,
    previousRank: 18,
    heatScore: 66,
    growthRate: 22,
    controversyScore: 48,
    sentiment: "正向",
    searchIntentScore: 78,
    trend: [
      { time: "08:00", heat: 48 },
      { time: "10:00", heat: 55 },
      { time: "12:00", heat: 62 },
      { time: "14:00", heat: 66 },
    ],
    aiSummary: "校园餐平台将公共治理问题转化为家长可查询、可反馈的产品体验。",
    keyPoints: ["平台展示食材来源、菜品营养和留样信息。", "家长关注数据更新频率和投诉反馈闭环。", "学校需要在公开透明和运营效率之间平衡。"],
    timeline: [
      { time: "昨日 10:00", event: "试点平台发布上线通知。" },
      { time: "今日 08:00", event: "家长群开始传播查询入口。" },
      { time: "今日 12:20", event: "首批使用反馈集中在菜品照片和更新速度。" },
    ],
    viewpoints: [
      { side: "家长", summary: "认为透明化能增强信任，减少信息不对称。" },
      { side: "学校", summary: "担心额外录入工作和误读带来沟通成本。" },
    ],
    relatedQueries: ["校园餐平台入口", "学校食材来源查询", "校园餐投诉渠道", "学生营养餐标准"],
    suggestedQuestions: ["平台解决了什么问题？", "家长最需要哪些信息？", "反馈如何影响后续推荐？"],
    mockAnswers: answer("校园餐透明化平台", "食品安全和家校信任是高敏感议题，平台入口带来明确查询需求。", "“校园餐查询入口”“营养餐标准”“投诉反馈流程”"),
    followRate: 24,
    negativeFeedbackRate: 5,
  },
  {
    id: "variety-editing-dispute",
    title: "旅行综艺剪辑争议引发嘉宾回应",
    category: "娱乐",
    rank: 14,
    previousRank: 6,
    heatScore: 64,
    growthRate: -18,
    controversyScore: 79,
    sentiment: "负向",
    searchIntentScore: 66,
    trend: [
      { time: "08:00", heat: 78 },
      { time: "10:00", heat: 72 },
      { time: "12:00", heat: 67 },
      { time: "14:00", heat: 64 },
    ],
    aiSummary: "综艺争议已从情绪化讨论进入事实核验阶段，用户想看原片、回应和时间线。",
    keyPoints: ["节目片段被质疑通过剪辑制造矛盾。", "嘉宾发文称部分语境被省略。", "制作方回应会在加更中补充完整过程。"],
    timeline: [
      { time: "前日 22:00", event: "节目正片播出引发嘉宾关系讨论。" },
      { time: "昨日 13:00", event: "嘉宾发文回应剪辑争议。" },
      { time: "今日 10:00", event: "节目方发布加更预告。" },
    ],
    viewpoints: [
      { side: "观众", summary: "希望综艺保留真实语境，减少冲突营销。" },
      { side: "制作方", summary: "认为综艺叙事需要节奏，但应避免误导。" },
    ],
    relatedQueries: ["旅行综艺剪辑争议", "嘉宾回应全文", "节目加更在哪里看", "综艺恶意剪辑怎么判断"],
    suggestedQuestions: ["争议源头是什么？", "嘉宾回应可信度如何？", "还应该看哪些原始片段？"],
    mockAnswers: answer("旅行综艺剪辑争议", "明星关系、节目叙事和平台剪辑机制共同放大了讨论。", "“嘉宾回应全文”“节目原片片段”“剪辑争议时间线”"),
    followRate: 18,
    negativeFeedbackRate: 20,
  },
  {
    id: "basketball-trade-rumor",
    title: "篮球明星转会传闻持续发酵",
    category: "体育",
    rank: 15,
    previousRank: 16,
    heatScore: 61,
    growthRate: 9,
    controversyScore: 57,
    sentiment: "中性",
    searchIntentScore: 70,
    trend: [
      { time: "08:00", heat: 52 },
      { time: "10:00", heat: 57 },
      { time: "12:00", heat: 60 },
      { time: "14:00", heat: 61 },
    ],
    aiSummary: "转会传闻带来持续追踪型消费，用户关心可信消息源、球队空间和阵容影响。",
    keyPoints: ["多名记者给出不同版本的转会消息。", "球迷关注薪资空间、筹码和球队战术变化。", "目前尚无官方确认，信息可信度需分层。"],
    timeline: [
      { time: "昨日 09:00", event: "记者爆料球队正在接触交易方案。" },
      { time: "昨日 22:00", event: "球员经纪团队否认部分传闻。" },
      { time: "今日 12:00", event: "球队管理层表示不评论流言。" },
    ],
    viewpoints: [
      { side: "支持交易", summary: "认为球队需要明星球员提升季后赛竞争力。" },
      { side: "反对交易", summary: "担心筹码过高破坏阵容深度和长期规划。" },
    ],
    relatedQueries: ["篮球明星转会最新消息", "球队薪资空间", "交易筹码分析", "转会窗口截止时间"],
    suggestedQuestions: ["消息源可靠吗？", "转会会影响球队战术吗？", "还应该关注哪些时间点？"],
    mockAnswers: answer("篮球明星转会传闻", "体育交易天然适合持续追踪，用户会反复搜索最新进展和可信度。", "“转会最新消息”“薪资空间分析”“交易截止日”"),
    followRate: 27,
    negativeFeedbackRate: 9,
  },
];

export const presetQuestions = questions;

