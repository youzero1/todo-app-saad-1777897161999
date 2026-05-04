'use client';

import { FilterType, SortType } from '@/types';

interface TodoFiltersProps {
  filter: FilterType;
  sort: SortType;
  onFilterChange: (f: FilterType) => void;
  onSortChange: (s: SortType) => void;
}

export default function TodoFilters({ filter, sort, onFilterChange, onSortChange }: TodoFiltersProps) {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
              filter === f
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortType)}
        className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
      >
        <option value="created_at">Newest first</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  );
}
