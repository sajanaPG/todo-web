import { createTaskSchema, markTaskCompletedSchema, getTasksSchema } from './task.validation';

describe('Validation Schemas', () => {
  describe('createTaskSchema', () => {
    it('should pass with valid data', async () => {
      await expect(
        createTaskSchema.validate({
          body: { title: 'Test', description: 'Desc' },
        })
      ).resolves.toBeTruthy();
    });
    it('should fail if title is missing', async () => {
      await expect(createTaskSchema.validate({ body: { description: 'Desc' } })).rejects.toThrow();
    });
    it('should fail if title is not a string', async () => {
      await expect(createTaskSchema.validate({ body: { title: 123 } })).rejects.toThrow();
    });
  });

  describe('markTaskCompletedSchema', () => {
    it('should pass with valid id', async () => {
      await expect(
        markTaskCompletedSchema.validate({ params: { id: 'b3b3b3b3-b3b3-4b3b-b3b3-b3b3b3b3b3b3' } })
      ).resolves.toBeTruthy();
    });
    it('should fail with invalid id', async () => {
      await expect(
        markTaskCompletedSchema.validate({ params: { id: 'not-a-uuid' } })
      ).rejects.toThrow();
    });
  });

  describe('getTasksSchema', () => {
    it('should pass with valid take', async () => {
      await expect(getTasksSchema.validate({ query: { take: 5 } })).resolves.toBeTruthy();
    });
    it('should fail if take is not a number', async () => {
      await expect(getTasksSchema.validate({ query: { take: 'abc' } })).rejects.toThrow();
    });
    it('should fail if take is less than 1', async () => {
      await expect(getTasksSchema.validate({ query: { take: 0 } })).rejects.toThrow();
    });
  });
});
