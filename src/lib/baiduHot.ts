import { baiduHotSnapshot, baiduHotSnapshotDate, type BaiduHotCategory, type BaiduHotItem } from "@/data/baiduHotSnapshot";

const BAIDU_HOT_URL = "https://top.baidu.com/board?tab=realtime";
const CATEGORY_KEYWORDS: Array<{ category: BaiduHotCategory; keywords: string[] }> = [
  { category: "体育", keywords: ["C罗", "国乒", "王楚钦", "克罗地亚", "莫德里奇", "世界杯", "男单", "球迷", "点球"] },
  { category: "教育", keywords: ["教育部", "高校", "学生", "资助", "高考", "学校"] },
  { category: "国际", keywords: ["委内瑞拉", "日本", "中国海军", "美国", "俄罗斯", "韩国", "伊朗"] },
  { category: "辟谣", keywords: ["谣言", "辟谣"] },
  { category: "职业", keywords: ["人社部", "新职业", "就业", "程序员"] },
  { category: "民生", keywords: ["电梯", "全楼", "小区", "物业", "住房"] },
  { category: "健康", keywords: ["弱视", "视力", "医院", "医生", "健康"] },
  { category: "科技", keywords: ["程序员", "银河", "AI", "芯片", "手机"] },
  { category: "消费", keywords: ["价格", "补贴", "旅游", "酒店", "消费"] },
  { category: "时政", keywords: ["中国共产党", "人社部", "教育部"] },
];

export type BaiduHotOverview = {
  items: BaiduHotItem[];
  sourceUrl: string;
  sourceLabel: string;
  fetchedAt: string;
  isLive: boolean;
};

export async function getBaiduHotOverview(): Promise<BaiduHotOverview> {
  try {
    const response = await fetch(BAIDU_HOT_URL, {
      headers: {
        "user-agent": "Mozilla/5.0 HotInsight portfolio demo",
      },
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      throw new Error(`Baidu hot board returned ${response.status}`);
    }

    const html = await response.text();
    const items = parseBaiduHotHtml(html);

    if (items.length < 10) {
      throw new Error("Baidu hot board parser returned too few items");
    }

    return {
      items,
      sourceUrl: BAIDU_HOT_URL,
      sourceLabel: "百度热搜实时榜",
      fetchedAt: formatDateTime(new Date()),
      isLive: true,
    };
  } catch {
    return {
      items: baiduHotSnapshot,
      sourceUrl: BAIDU_HOT_URL,
      sourceLabel: `百度热搜实时榜快照 ${baiduHotSnapshotDate}`,
      fetchedAt: baiduHotSnapshotDate,
      isLive: false,
    };
  }
}

export function getBaiduHotSummary(items: BaiduHotItem[]) {
  const totalHeat = items.reduce((sum, item) => sum + item.heatIndex, 0);
  const topCategory = getTopCategory(items);
  const sportsCount = items.filter((item) => item.category === "体育").length;
  const publicIssueCount = items.filter((item) => ["时政", "国际", "民生", "社会", "辟谣"].includes(item.category)).length;

  return {
    total: items.length,
    maxHeat: Math.max(...items.map((item) => item.heatIndex)),
    averageHeat: Math.round(totalHeat / Math.max(items.length, 1)),
    topCategory,
    sportsCount,
    publicIssueCount,
  };
}

export function getHotIntent(item: BaiduHotItem) {
  if (item.category === "体育") {
    return "赛事进展追踪";
  }
  if (["时政", "国际", "辟谣"].includes(item.category)) {
    return "事实背景理解";
  }
  if (["民生", "健康", "职业", "消费"].includes(item.category)) {
    return "实用影响判断";
  }
  return "搜索扩展";
}

export function getHotAction(item: BaiduHotItem) {
  const intent = getHotIntent(item);
  if (intent === "赛事进展追踪") {
    return "优先承接赛况、关键节点、人物背景和后续赛程搜索。";
  }
  if (intent === "事实背景理解") {
    return "优先展示事件背景、权威来源、时间线和争议澄清。";
  }
  if (intent === "实用影响判断") {
    return "优先回答影响谁、怎么办、还应搜索什么。";
  }
  return "优先生成相关 Query，帮助用户从标题进入连续搜索。";
}

export function getHotRisk(item: BaiduHotItem) {
  if (item.tag === "辟谣" || item.category === "辟谣") {
    return "信息风险高：应明确标注辟谣来源，避免继续传播错误叙事。";
  }
  if (["国际", "时政"].includes(item.category)) {
    return "事实链路要求高：摘要需要保留来源和时间边界。";
  }
  if (item.category === "体育") {
    return "情绪传播强：适合补充赛况事实，避免只放大输赢情绪。";
  }
  return "可用反馈验证兴趣：关注后续、不感兴趣会影响同类推荐权重。";
}

function parseBaiduHotHtml(html: string): BaiduHotItem[] {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "\n")
    .replace(/<style[\s\S]*?<\/style>/gi, "\n")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const lines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const items: BaiduHotItem[] = [];
  const seen = new Set<string>();

  for (let index = 0; index < lines.length && items.length < 30; index += 1) {
    const heat = Number(lines[index]);
    if (!Number.isFinite(heat) || heat < 10000 || lines[index + 1] !== "热搜指数") {
      continue;
    }

    const title = findTitle(lines, index + 2);
    if (!title || seen.has(title)) {
      continue;
    }

    seen.add(title);
    items.push({
      rank: items.length + 1,
      title,
      heatIndex: heat,
      category: inferCategory(title),
      tag: inferTag(title),
    });
  }

  return items;
}

function findTitle(lines: string[], start: number) {
  for (let cursor = start; cursor < Math.min(lines.length, start + 8); cursor += 1) {
    const candidate = normalizeTitle(lines[cursor]);
    if (candidate && !isNoise(candidate)) {
      return candidate;
    }
  }

  return "";
}

function normalizeTitle(title: string) {
  return title.replace(/\s+(热|新|辟谣)$/g, "").replace(/^(热|新|辟谣)\s+/g, "").trim();
}

function isNoise(value: string) {
  return (
    value === "热搜指数" ||
    value === "查看更多" ||
    value === "查看完整榜单" ||
    value === "百度热搜" ||
    /^\d+$/.test(value) ||
    value.length < 4
  );
}

function inferCategory(title: string): BaiduHotCategory {
  const matched = CATEGORY_KEYWORDS.find((item) => item.keywords.some((keyword) => title.includes(keyword)));
  return matched?.category ?? "社会";
}

function inferTag(title: string): BaiduHotItem["tag"] {
  if (title.includes("谣言") || title.includes("辟谣")) {
    return "辟谣";
  }
  return undefined;
}

function getTopCategory(items: BaiduHotItem[]) {
  const counts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "暂无";
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
