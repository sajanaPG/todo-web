import request from 'supertest';
import app from '../../app';
import prisma from '../../config/db';
import { randomUUID } from 'crypto';

jest.mock('../../config/db', () => {
  const tasks: any[] = [];
  return {
    __esModule: true,
    default: {
      task: {
        findMany: jest.fn(({ take }) => tasks.filter((t) => !t.completed).slice(0, take)),
        create: jest.fn(({ data }) => {
          const newTask = {
            ...data,
            id: randomUUID(),
            completed: false,
            createdAt: new Date(),
          };
          tasks.push(newTask);
          return newTask;
        }),
        update: jest.fn(({ where, data }) => {
          const idx = tasks.findIndex((t) => t.id === where.id);
          if (idx === -1) throw { code: 'P2025' };
          tasks[idx] = { ...tasks[idx], ...data };
          return tasks[idx];
        }),
      },
    },
  };
});

describe('Task API integration', () => {
  beforeEach(() => {
    // @ts-ignore
    prisma.task.findMany.mockClear();
  });

  describe('GET /api/tasks', () => {
    it('should return latest uncompleted tasks', async () => {
      prisma.task.create({ data: { title: 'A', description: 'desc' } });
      prisma.task.create({ data: { title: 'B', description: 'desc' } });

      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should respect the take query param', async () => {
      const res = await request(app).get('/api/tasks?take=1');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a task with valid data', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'New Task', description: 'desc' });
      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe('New Task');
      expect(res.body.data.completed).toBe(false);
    });

    it('should fail with invalid data', async () => {
      const res = await request(app).post('/api/tasks').send({ description: 'desc' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    it('should mark a task as completed', async () => {
      // Create a task first
      const createRes = await request(app)
        .post('/api/tasks')
        .send({ title: 'To Complete', description: 'desc' });

      const id = createRes.body.data.id;
      const res = await request(app).patch(`/api/tasks/${id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.completed).toBe(true);
    });

    it('should fail for invalid id', async () => {
      const res = await request(app).patch('/api/tasks/invalid-id');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail for not found id', async () => {
      const res = await request(app).patch(`/api/tasks/${randomUUID()}`);
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
