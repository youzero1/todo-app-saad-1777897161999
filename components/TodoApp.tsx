'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, FilterType, SortType } from '@/types';
import TodoInput from '@/components/TodoInput';
import TodoItem from '@/components/TodoItem';
import TodoFilters from '@/components/TodoFilters';
import TodoStats from '@/components/TodoStats';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('created_at');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/todos');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setTodos(data);
    } catch {
      setError('Failed to load todos. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (title: string) => {
    try {
      setError(null);
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to add');
      const newTodo = await res.json();
      setTodos((prev) => [newTodo, ...prev]);
    } catch {
      setError('Failed to add todo. Please try again.');
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      setError(null);
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError('Failed to update todo. Please try again.');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError('Failed to delete todo. Please try again.');
    }
  };

  const editTodo = async (id: string, title: string) => {
    try {
      setError(null);
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to edit');
      const updated = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError('Failed to edit todo. Please try again.');
    }
  };

  const clearCompleted = async () => {
    const completed = todos.filter((t) => t.completed);
    await Promise.all(completed.map((t) => deleteTodo(t.id)));
  };

  const filteredAndSorted = todos
    .filter((t) => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    })
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'alphabetical') return a.title.localeCompare(b.title);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">My Todos</h1>
        <p className="text-slate-500">Stay organized, get things done.</p>
      </div>

      <TodoStats todos={todos} />

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <TodoInput onAdd={addTodo} />
        </div>

        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="mb-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search todos..."
              className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            />
          </div>
          <TodoFilters
            filter={filter}
            sort={sort}
            onFilterChange={setFilter}
            onSortChange={setSort}
          />
        </div>

        {error && (
          <div className="mx-6 mt-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
            </div>
          ) : filteredAndSorted.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-slate-400 text-lg font-medium">
                {search
                  ? 'No todos match your search.'
                  : filter === 'completed'
                  ? 'No completed todos yet.'
                  : filter === 'active'
                  ? 'No active todos!'
                  : 'Add your first todo above!'}
              </p>
            </div>
          ) : (
            filteredAndSorted.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {todos.some((t) => t.completed) && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={clearCompleted}
              className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Clear completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
