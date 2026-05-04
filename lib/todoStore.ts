import { Todo } from '@/types';

const store: { todos: Todo[] } = { todos: [] };

export function readTodos(): Todo[] {
  return store.todos;
}

export function writeTodos(todos: Todo[]): void {
  store.todos = todos;
}
