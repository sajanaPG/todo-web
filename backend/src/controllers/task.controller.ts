import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/task.service';
import { createdResponse, successResponse } from '../utils/responses';
import { handleError } from '../utils/error-handler';

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const take = req.query.take ? parseInt(req.query.take as string, 10) : 5;
    const tasks = await taskService.getTasks(take);
    return successResponse(res, tasks);
  } catch (err) {
    return handleError(res, err);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;
    const task = await taskService.createTask(title, description);
    return createdResponse(res, task);
  } catch (err) {
    return handleError(res, err);
  }
};

export const markTaskCompleted = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updatedTask = await taskService.markTaskCompleted(id);
    return successResponse(res, updatedTask);
  } catch (err) {
    return handleError(res, err);
  }
};
