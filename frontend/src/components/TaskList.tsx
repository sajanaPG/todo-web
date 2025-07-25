import { markCompletedApi } from '../services/task.service';
import type { Task } from '../types/Task';
import TaskCard from './TaskCard';
import TaskSkeleton from './TaskSkeleton';

interface Props {
  tasks: Task[];
  isLoading: boolean;
  refresh: () => void;
}

export default function TaskList({ tasks, isLoading, refresh }: Props) {
  const markCompleted = async (id: string) => {
    await markCompletedApi(id);
    refresh();
  };

  return (
    <div className="flex-1 space-y-4">
      {isLoading ? (
        <TaskSkeleton count={3} />
      ) : tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} onComplete={markCompleted} task={task} />)
      ) : (
        <div className="text-center text-gray-500 mt-4">🎉 There are no pending tasks!</div>
      )}
    </div>
  );
}
