'use client';

import { useState } from 'react';
import { Todo } from '@/types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, title: string) => Promise<void>;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleEdit = async () => {
    if (editText.trim() && editText.trim() !== todo.title) {
      await onEdit(todo.id, editText.trim());
    }
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-3 px-6 py-4 hover:bg-slate-50 transition-colors group">
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-slate-300 hover:border-indigo-400'
        }`}
      >
        {todo.completed && (
          <svg className="w-full h-full text-white p-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {editing ? (
        <input
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEdit();
            if (e.key === 'Escape') setEditing(false);
          }}
          className="flex-1 px-2 py-1 text-sm border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 text-sm cursor-pointer ${
            todo.completed ? 'line-through text-slate-400' : 'text-slate-700'
          }`}
        >
          {todo.title}
        </span>
      )}

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setEditing(true)}
          className="text-xs text-slate-400 hover:text-indigo-500 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-xs text-slate-400 hover:text-red-500 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
