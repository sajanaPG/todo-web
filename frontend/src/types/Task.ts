export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export type TaskCreateInput = Pick<Task, 'title' | 'description'>;
