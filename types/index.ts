export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'createdAt' | 'priority' | 'alphabetical';
export type PriorityType = 'low' | 'medium' | 'high';
