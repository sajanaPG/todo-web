import { useCallback, useEffect, useState } from 'react';
import { getTasksApi } from '../services/task.service';
import type { Task } from '../types/Task';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { taskLimit } from '../constants/constants';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    const res = await getTasksApi(taskLimit);
    setTasks(res.data.data);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskCreate = (newTask: Task) => {
    setTasks((prev) => {
      if (prev.length === taskLimit) {
        // Remove the last task and add the new one at the beginning
        return [newTask, ...prev.slice(0, taskLimit - 1)];
      }
      return [newTask, ...prev];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 py-10 px-4">
      <h1 className="text-2xl font-bold mb-5 text-center">📝 To-Do List</h1>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex-shrink-0">
          <TaskForm onTaskCreated={handleTaskCreate} />
        </div>
        <div className="md:w-2/3 flex-grow">
          <TaskList tasks={tasks} refresh={fetchTasks} />
        </div>
      </div>
    </div>
  );
}
