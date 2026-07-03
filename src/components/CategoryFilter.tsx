"use client";

import type { TopicCategory } from "@/data/hotTopics";
import type { SortOption } from "@/lib/topicMetrics";
import { categories, sortOptions } from "@/lib/topicMetrics";

type Props = {
  selectedCategory: "全部" | TopicCategory;
  selectedSort: SortOption;
  onCategoryChange: (category: "全部" | TopicCategory) => void;
  onSortChange: (sort: SortOption) => void;
};

export function CategoryFilter({ selectedCategory, selectedSort, onCategoryChange, onSortChange }: Props) {
  return (
    <div className="panel p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                selectedCategory === category ? "bg-ink text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          排序
          <select
            value={selectedSort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-ink outline-none focus:border-ink"
          >
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
