'use client';

import { Todo } from '@/types';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm p-4 text-center border border-slate-100">
        <div className="text-2xl font-bold text-slate-700">{total}</div>
        <div className="text-xs text-slate-500 font-medium mt-1">Total</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-4 text-center border border-slate-100">
        <div className="text-2xl font-bold text-indigo-600">{active}</div>
        <div className="text-xs text-slate-500 font-medium mt-1">Active</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-4 text-center border border-slate-100">
        <div className="text-2xl font-bold text-emerald-600">{completed}</div>
        <div className="text-xs text-slate-500 font-medium mt-1">Done</div>
      </div>
      {total > 0 && (
        <div className="col-span-3 bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Progress</span>
            <span className="text-xs font-bold text-indigo-600">{percentage}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
