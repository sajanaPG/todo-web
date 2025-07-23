import prisma from '../config/db';
import { NotFoundError } from '../utils/custom-errors';

export const getTasks = (take: number) => {
  return prisma.task.findMany({
    where: { completed: false },
    orderBy: { createdAt: 'desc' },
    take,
  });
};

export const createTask = (title: string, description: string) => {
  return prisma.task.create({ data: { title, description } });
};

export const markTaskCompleted = async (id: string) => {
  try {
    return await prisma.task.update({
      where: { id },
      data: { completed: true },
    });
  } catch (err: any) {
    if (err.code === 'P2025') {
      throw new NotFoundError('Task not found');
    }
    throw err;
  }
};
