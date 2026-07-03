import { BaiduHotOverview } from "@/components/BaiduHotOverview";
import { getBaiduHotOverview } from "@/lib/baiduHot";

export const revalidate = 600;

export default async function HomePage() {
  const overview = await getBaiduHotOverview();

  return <BaiduHotOverview overview={overview} />;
}
