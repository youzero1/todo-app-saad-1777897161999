'use client';

import { FilterType, SortType } from '@/types';

interface TodoFiltersProps {
  filter: FilterType;
  sort: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

const SORTS: { label: string; value: SortType }[] = [
  { label: 'Newest', value: 'createdAt' },
  { label: 'Priority', value: 'priority' },
  { label: 'A–Z', value: 'alphabetical' },
];

export default function TodoFilters({ filter, sort, onFilterChange, onSortChange }: TodoFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex rounded-lg overflow-hidden border border-slate-200 bg-white">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f.value
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 font-medium">Sort:</span>
        <div className="flex rounded-lg overflow-hidden border border-slate-200 bg-white">
          {SORTS.map((s) => (
            <button
              key={s.value}
              onClick={() => onSortChange(s.value)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                sort === s.value
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
