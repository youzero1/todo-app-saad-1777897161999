export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
  user_id?: string | null;
}

export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'created_at' | 'alphabetical';
