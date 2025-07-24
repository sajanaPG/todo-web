import * as taskService from '../../services/task.service';
import prisma from '../../config/db';

jest.mock('../../config/db', () => ({
  __esModule: true,
  default: {
    task: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe('taskService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTasks', () => {
    it('should call prisma.task.findMany with correct args', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', completed: false, createdAt: new Date() },
        { id: 2, title: 'Task 2', completed: false, createdAt: new Date() },
      ];
      (prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks);
      const result = await taskService.getTasks(3);
      expect(prisma.task.findMany).toHaveBeenCalledWith({
        where: { completed: false },
        orderBy: { createdAt: 'desc' },
        take: 3,
      });
      expect(result).toEqual(mockTasks);
    });
  });

  describe('createTask', () => {
    it('should call prisma.task.create with correct args', async () => {
      const mockTask = {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        createdAt: new Date(),
      };
      (prisma.task.create as jest.Mock).mockResolvedValue(mockTask);
      const result = await taskService.createTask('Test Task', 'Test Description');
      expect(prisma.task.create).toHaveBeenCalledWith({
        data: { title: 'Test Task', description: 'Test Description' },
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe('markTaskCompleted', () => {
    it('should call prisma.task.update with correct args', async () => {
      (prisma.task.update as jest.Mock).mockResolvedValue({ id: '1', completed: true });
      const result = await taskService.markTaskCompleted('1');
      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { completed: true },
      });
      expect(result).toEqual({ id: '1', completed: true });
    });
  });
});
