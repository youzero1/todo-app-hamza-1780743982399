import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import type { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
  categories: string[];
};

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-emerald-600' },
  { value: 'medium', label: 'Medium', color: 'text-amber-600' },
  { value: 'high', label: 'High', color: 'text-red-600' },
];

export default function AddTodoForm({ onAdd, categories }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category);
    setText('');
    setCategory('');
    setPriority('medium');
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-5 overflow-hidden">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 p-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 text-gray-800 placeholder-gray-400 bg-transparent outline-none text-sm"
          />
          <button
            type="button"
            onClick={() => setShowOptions((v) => !v)}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Toggle options"
          >
            <ChevronDown
              className={clsx('w-4 h-4 transition-transform', showOptions && 'rotate-180')}
            />
          </button>
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex items-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {showOptions && (
          <div className="border-t border-gray-100 px-4 py-3 flex flex-wrap gap-4 bg-gray-50">
            {/* Priority */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Priority</label>
              <div className="flex gap-2">
                {PRIORITIES.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={clsx(
                      'px-3 py-1 rounded-lg text-xs font-medium border transition-all',
                      priority === p.value
                        ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="flex-1 min-w-32">
              <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Work, Personal…"
                list="categories-list"
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-400 bg-white"
              />
              <datalist id="categories-list">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
