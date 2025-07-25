import { markCompletedApi } from '../services/task.service';
import type { Task } from '../types/Task';
import TaskCard from './TaskCard';

interface Props {
  tasks: Task[];
  refresh: () => void;
}

export default function TaskList({ tasks, refresh }: Props) {
  const markCompleted = async (id: string) => {
    await markCompletedApi(id);
    refresh();
  };

  return (
    <div className="flex-1 space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} onComplete={markCompleted} task={task} />
      ))}
    </div>
  );
}
