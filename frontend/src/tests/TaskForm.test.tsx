import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import { vi, describe, beforeEach, expect, it, type Mock } from 'vitest';
import { createTaskApi } from '../services/task.service';
import type { Task } from '../types/Task';

// Mock the API
vi.mock('../services/task.service');

describe('TaskForm', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Title',
    description: 'Test Description',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  const mockOnTaskCreated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders inputs and button', () => {
    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('submits the form and calls createTaskApi', async () => {
    (createTaskApi as Mock).mockResolvedValue({
      data: { data: mockTask },
    });

    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: 'Test Description' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(createTaskApi).toHaveBeenCalledWith({
        title: 'Test Title',
        description: 'Test Description',
      });
      expect(mockOnTaskCreated).toHaveBeenCalledWith(mockTask);
    });
  });

  it('clears the form after submit', async () => {
    (createTaskApi as Mock).mockResolvedValue({
      data: { data: mockTask },
    });

    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    const titleInput = screen.getByPlaceholderText(/title/i) as HTMLInputElement;
    const descInput = screen.getByPlaceholderText(/description/i) as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'Test title' } });
    fireEvent.change(descInput, { target: { value: 'Test desc' } });

    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(titleInput.value).toBe('');
      expect(descInput.value).toBe('');
    });
  });

  it('shows loading text while submitting', async () => {
    (createTaskApi as Mock).mockResolvedValue({
      data: { data: mockTask },
    });

    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);
    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: 'Title' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByRole('button')).toHaveTextContent(/adding.../i);

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent(/add/i);
    });
  });
});
