import type { Task } from '../types/Task';

interface Props {
  task: Task;
  onComplete: (id: string) => void;
}

export default function TaskCard({ task, onComplete }: Props) {
  return (
    <div className="bg-amber-50 rounded-xl shadow-sm p-4 flex justify-between items-start">
      <div>
        <h3 className="font-bold text-lg">{task.title}</h3>
        <p className="text-sm text-gray-700">{task.description}</p>
      </div>
      {!task.completed && (
        <button
          onClick={() => onComplete(task.id)}
          className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 px-4 py-1 rounded transition text-sm"
        >
          Done
        </button>
      )}
    </div>
  );
}
