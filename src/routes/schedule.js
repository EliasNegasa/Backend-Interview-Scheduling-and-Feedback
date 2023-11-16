import { Router } from 'express';
import {
  createSchedule,
  deleteSchedule,
  getScheduleById,
  getSchedules,
  updateSchedule,
} from '../controllers/schedule';

const router = Router();

router.route('/').get(getSchedules).post(createSchedule);

router
  .route('/:id')
  .get(getScheduleById)
  .patch(updateSchedule)
  .delete(deleteSchedule);

export default router;
