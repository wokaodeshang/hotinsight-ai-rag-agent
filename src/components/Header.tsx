"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bot, Compass, Flame, GitBranch, Search } from "lucide-react";

const navItems = [
  { href: "/", label: "热点总览", icon: Flame },
  { href: "/ask", label: "AI 问答", icon: Bot },
  { href: "/dashboard", label: "数据看板", icon: BarChart3 },
  { href: "/strategy", label: "策略设计", icon: GitBranch },
  { href: "/research", label: "调研分析", icon: Compass },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-white">
            <Search size={20} />
          </span>
          <span>
            <span className="block text-xl font-bold text-ink">HotInsight</span>
            <span className="block text-xs text-muted">AI 驱动的热点理解与搜索推荐助手</span>
          </span>
        </Link>
        <nav className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
