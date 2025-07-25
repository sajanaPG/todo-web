import { useState } from 'react';
import { createTaskApi } from '../services/task.service';
import type { Task } from '../types/Task';

interface Props {
  onTaskCreated: (newTask: Task) => void;
}
export default function TaskForm({ onTaskCreated }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await createTaskApi({ title, description });
      onTaskCreated(res.data.data);
      setTitle('');
      setDescription('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-orange-200 rounded-xl p-6 w-full md:max-w-xs shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Add a Task</h2>
      <input
        className="w-full p-2 rounded-md mb-3 bg-orange-100 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full p-2 rounded-md mb-4 bg-orange-100 placeholder-gray-700 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-teal-900 text-white font-medium py-2 px-4 rounded hover:bg-teal-800 transition"
      >
        {isLoading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
