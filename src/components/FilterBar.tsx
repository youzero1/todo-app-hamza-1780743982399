import clsx from 'clsx';
import { Search, Trash2 } from 'lucide-react';
import type { Filter } from '@/types';

type FilterBarProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  search: string;
  setSearch: (s: string) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  categories: string[];
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export default function FilterBar({
  filter,
  setFilter,
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  categories,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="mb-4 space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks…"
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400 transition-colors"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Filter tabs */}
        <div className="flex bg-white border border-gray-200 rounded-xl p-1 gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={clsx(
                'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                filter === f.value
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs border border-gray-200 bg-white rounded-xl px-3 py-2 outline-none focus:border-indigo-400 text-gray-600"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}

        {/* Clear completed */}
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors ml-auto border border-red-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear done ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
}
