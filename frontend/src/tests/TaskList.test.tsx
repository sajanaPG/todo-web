import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskList from '../components/TaskList';
import type { Task } from '../types/Task';
import * as taskService from '../services/task.service';

vi.mock('../services/task.service');

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test description',
  completed: false,
  createdAt: new Date().toISOString(),
};

describe('TaskList', () => {
  const refresh = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading skeleton when isLoading is true', () => {
    render(<TaskList tasks={[]} isLoading={true} refresh={refresh} />);
    expect(screen.getAllByTestId('task-skeleton')).toHaveLength(3);
  });

  it('renders task cards when tasks are present', () => {
    render(<TaskList tasks={[mockTask]} isLoading={false} refresh={refresh} />);
    expect(screen.getByText(/test task/i)).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
  });

  it('renders empty state when no tasks are present', () => {
    render(<TaskList tasks={[]} isLoading={false} refresh={refresh} />);
    expect(screen.getByText(/no pending tasks/i)).toBeInTheDocument();
  });

  it('calls markCompletedApi and refresh on clicking "Done"', async () => {
    const markCompletedApi = taskService.markCompletedApi as unknown as ReturnType<typeof vi.fn>;
    markCompletedApi.mockResolvedValue({});

    render(<TaskList tasks={[mockTask]} isLoading={false} refresh={refresh} />);
    fireEvent.click(screen.getByRole('button', { name: /done/i }));

    await waitFor(() => {
      expect(markCompletedApi).toHaveBeenCalledWith('1');
      expect(refresh).toHaveBeenCalled();
    });
  });
});
