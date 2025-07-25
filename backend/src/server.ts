import app from './app';
import { scheduleCleanupJob } from './jobs/cleanup';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  scheduleCleanupJob();
  console.log(`Server running on ${PORT}`);
});
