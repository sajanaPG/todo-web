import cron from 'node-cron';
import { deleteOldTasks } from '../services/task.service';

export const scheduleCleanupJob = () => {
  cron.schedule('0 2 * * *', async () => {
    await deleteOldTasks();
  });
};
