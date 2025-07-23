import { Router } from 'express';
import { getTasks, createTask, markTaskCompleted } from '../controllers/task.controller';
import { validate } from '../middlewares/validate.middleware';
import {
  createTaskSchema,
  getTasksSchema,
  markTaskCompletedSchema,
} from '../validations/task.validation';

const router = Router();

router.get('/', validate(getTasksSchema), getTasks);
router.post('/', validate(createTaskSchema), createTask);
router.patch('/:id', validate(markTaskCompletedSchema), markTaskCompleted);

export default router;
