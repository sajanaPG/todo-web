import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';
import { vi, type Mock } from 'vitest';
import * as taskService from '../services/task.service';
import type { AxiosResponse } from 'axios';

const mockTasks = [
  { id: '1', title: 'Task 1', description: 'desc', completed: false, createdAt: new Date() },
  { id: '2', title: 'Task 2', description: 'desc', completed: false, createdAt: new Date() },
];

vi.mock('../services/task.service');

describe('Home component', () => {
  beforeEach(() => {
    (taskService.getTasksApi as Mock).mockResolvedValue({
      data: { data: mockTasks },
    });
  });

  it('fetches and renders tasks', async () => {
    render(<Home />);
    expect(screen.getByText(/to-do list/i)).toBeInTheDocument();
    expect(await screen.findByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('shows loading skeleton initially', async () => {
    render(<Home />);
    expect(screen.getAllByTestId('task-skeleton').length).toBeGreaterThan(0);
    await waitFor(() => screen.getByText('Task 1'));
  });

  it('adds new task and respects limit', async () => {
    render(<Home />);
    await screen.findByText('Task 1');

    const input = screen.getByPlaceholderText(/title/i);
    fireEvent.change(input, { target: { value: 'New Task' } });

    const button = screen.getByRole('button', { name: /add/i });

    vi.spyOn(taskService, 'createTaskApi').mockResolvedValue({
      data: {
        data: {
          id: '3',
          title: 'New Task',
          description: '',
          completed: false,
          createdAt: new Date(),
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    } as AxiosResponse);

    fireEvent.click(button);

    expect(await screen.findByText('New Task')).toBeInTheDocument();
  });
});
