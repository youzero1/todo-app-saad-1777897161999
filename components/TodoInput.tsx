'use client';

import { useState } from 'react';

interface TodoInputProps {
  onAdd: (title: string) => Promise<void>;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    await onAdd(text.trim());
    setText('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        disabled={loading}
        className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Adding…' : 'Add'}
      </button>
    </form>
  );
}
