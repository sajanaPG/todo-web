import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../components/TaskCard';
import type { Task } from '../types/Task';
import { describe, expect, it, vi } from 'vitest';

describe('TaskCard', () => {
  const baseTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  it('renders task title and description', () => {
    render(<TaskCard task={baseTask} onComplete={() => {}} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders "Done" button if task is not completed', () => {
    render(<TaskCard task={baseTask} onComplete={() => {}} />);
    expect(screen.getByRole('button', { name: /Done/i })).toBeInTheDocument();
  });

  it('does not render "Done" button if task is completed', () => {
    const completedTask = { ...baseTask, completed: true };
    render(<TaskCard task={completedTask} onComplete={() => {}} />);
    expect(screen.queryByRole('button', { name: /Done/i })).not.toBeInTheDocument();
  });

  it('calls onComplete when "Done" button is clicked', () => {
    const onComplete = vi.fn();
    render(<TaskCard task={baseTask} onComplete={onComplete} />);
    const button = screen.getByRole('button', { name: /Done/i });
    fireEvent.click(button);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith('1');
  });
});
