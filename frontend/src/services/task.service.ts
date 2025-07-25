import type { TaskCreateInput } from '../types/Task';
import api from './api';
import ROUTES from './routes';

export const getTasksApi = (take?: number) =>
  api.get(`${ROUTES.TASKS}${take ? `?take=${take}` : ''}`);

export const createTaskApi = (data: TaskCreateInput) => api.post(ROUTES.TASKS, data);

export const markCompletedApi = (id: string) => api.patch(`${ROUTES.TASKS}/${id}`);
