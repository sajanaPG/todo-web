import * as taskController from '../../controllers/task.controller';
import * as taskService from '../../services/task.service';
import * as responses from '../../utils/responses';
import * as errorHandler from '../../utils/error-handler';

const mockReq = (data: any = {}) => ({ ...data }) as any;
const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
const next = jest.fn();

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  completed: false,
  createdAt: new Date(),
};

describe('taskController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTasks', () => {
    it('should return tasks on success', async () => {
      const req = mockReq({ query: { take: '2' } });
      const res = mockRes();
      const tasks = [mockTask, { ...mockTask, id: '2' }];
      jest.spyOn(taskService, 'getTasks').mockResolvedValue(tasks);
      jest.spyOn(responses, 'successResponse').mockImplementation((r, d) => d);
      await taskController.getTasks(req, res, next);
      expect(taskService.getTasks).toHaveBeenCalledWith(2);
      expect(responses.successResponse).toHaveBeenCalledWith(res, tasks);
    });
    it('should handle errors', async () => {
      const req = mockReq({ query: {} });
      const res = mockRes();
      const error = new Error('fail');
      jest.spyOn(taskService, 'getTasks').mockRejectedValue(error);
      jest.spyOn(errorHandler, 'handleError').mockImplementation((r, e) => e);
      await taskController.getTasks(req, res, next);
      expect(errorHandler.handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('createTask', () => {
    it('should create and return a task', async () => {
      const req = mockReq({ body: { title: 't', description: 'd' } });
      const res = mockRes();
      jest.spyOn(taskService, 'createTask').mockResolvedValue(mockTask);
      jest.spyOn(responses, 'createdResponse').mockImplementation((r, d) => d);
      await taskController.createTask(req, res, next);
      expect(taskService.createTask).toHaveBeenCalledWith('t', 'd');
      expect(responses.createdResponse).toHaveBeenCalledWith(res, mockTask);
    });
    it('should handle errors', async () => {
      const req = mockReq({ body: { title: 't', description: 'd' } });
      const res = mockRes();
      const error = new Error('fail');
      jest.spyOn(taskService, 'createTask').mockRejectedValue(error);
      jest.spyOn(errorHandler, 'handleError').mockImplementation((r, e) => e);
      await taskController.createTask(req, res, next);
      expect(errorHandler.handleError).toHaveBeenCalledWith(res, error);
    });
  });

  describe('markTaskCompleted', () => {
    it('should mark task as completed and return success', async () => {
      const req = mockReq({ params: { id: '1' } });
      const res = mockRes();
      jest.spyOn(taskService, 'markTaskCompleted').mockResolvedValue(mockTask);
      jest.spyOn(responses, 'successResponse').mockImplementation((r, d) => d);
      await taskController.markTaskCompleted(req, res, next);
      expect(taskService.markTaskCompleted).toHaveBeenCalledWith('1');
      expect(responses.successResponse).toHaveBeenCalledWith(res, mockTask);
    });
    it('should handle errors', async () => {
      const req = mockReq({ params: { id: '1' } });
      const res = mockRes();
      const error = new Error('fail');
      jest.spyOn(taskService, 'markTaskCompleted').mockRejectedValue(error);
      jest.spyOn(errorHandler, 'handleError').mockImplementation((r, e) => e);
      await taskController.markTaskCompleted(req, res, next);
      expect(errorHandler.handleError).toHaveBeenCalledWith(res, error);
    });
  });
});
