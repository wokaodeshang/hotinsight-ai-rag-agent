export type BaiduHotCategory = "时政" | "体育" | "教育" | "国际" | "社会" | "辟谣" | "职业" | "民生" | "健康" | "科技" | "消费";

export type BaiduHotItem = {
  rank: number;
  title: string;
  heatIndex: number;
  category: BaiduHotCategory;
  tag?: "热" | "新" | "辟谣";
};

export const baiduHotSnapshotDate = "2026-07-03";

export const baiduHotSnapshot: BaiduHotItem[] = [
  { rank: 1, title: "中国共产党为什么能的关键密码", heatIndex: 7903984, category: "时政" },
  { rank: 2, title: "C罗点球破门！葡萄牙2-1克罗地亚", heatIndex: 7807934, category: "体育", tag: "热" },
  { rank: 3, title: "国乒男单全军覆没", heatIndex: 7711767, category: "体育", tag: "新" },
  { rank: 4, title: "教育部开通高校学生资助热线", heatIndex: 7616898, category: "教育" },
  { rank: 5, title: "克罗地亚103分钟绝平进球被吹", heatIndex: 7521160, category: "体育", tag: "热" },
  { rank: 6, title: "委内瑞拉震区几乎所有官员遇难", heatIndex: 7428510, category: "国际", tag: "热" },
  { rank: 7, title: "王楚钦无缘8强", heatIndex: 7328792, category: "体育", tag: "热" },
  { rank: 8, title: "男子山里死守3.5小时静等菌子长大", heatIndex: 7235983, category: "社会" },
  { rank: 9, title: "C罗哭了", heatIndex: 7142534, category: "体育", tag: "热" },
  { rank: 10, title: "神剧情！C罗从失落到眉开眼笑", heatIndex: 7048213, category: "体育", tag: "热" },
  { rank: 11, title: "17岁少年凌晨五点拔花生薅错地", heatIndex: 6945173, category: "社会" },
  { rank: 12, title: "影视小镇投资几十亿后倒闭？谣言", heatIndex: 6853307, category: "辟谣", tag: "辟谣" },
  { rank: 13, title: "人社部拟发布12个新职业", heatIndex: 6763041, category: "职业", tag: "新" },
  { rank: 14, title: "女子自费装“电梯”给全楼用遭抵制", heatIndex: 6659114, category: "民生" },
  { rank: 15, title: "爸爸带弱视儿子徒步2年改善视力", heatIndex: 6563395, category: "健康" },
  { rank: 16, title: "上海程序员拍下“银河落九天”", heatIndex: 6467132, category: "科技" },
  { rank: 17, title: "莫德里奇笑着告别世界杯", heatIndex: 6369929, category: "体育" },
  { rank: 18, title: "日本7天发布10条中国海军动态", heatIndex: 6271834, category: "国际" },
  { rank: 19, title: "克罗地亚球迷疯狂向场内投掷杂物", heatIndex: 6175124, category: "体育" },
  { rank: 20, title: "黑龙江一村大面积水稻疑被恶意投毒", heatIndex: 6080152, category: "社会" },
];
