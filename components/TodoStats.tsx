'use client';

import { Todo } from '@/types';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;

  if (total === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        { label: 'Total', value: total, color: 'text-slate-700' },
        { label: 'Active', value: active, color: 'text-indigo-600' },
        { label: 'Done', value: completed, color: 'text-green-600' },
      ].map(({ label, value, color }) => (
        <div key={label} className="bg-white rounded-xl shadow p-4 text-center">
          <div className={`text-2xl font-bold ${color}`}>{value}</div>
          <div className="text-xs text-slate-400 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}
