import { Router } from 'express';
import {
  createSchedule,
  deleteSchedule,
  getScheduleById,
  getSchedules,
  updateSchedule,
} from '../controllers/schedule';
import { auth } from '../middlewares/auth';
// import RecruiterAuth from '../middlewares/RecruiterAuth';

const router = Router();

router.route('/').all(auth).get(getSchedules).post(createSchedule);

router
  .route('/:id')
  .all(auth)
  .get(getScheduleById)
  .patch(updateSchedule)
  .delete(deleteSchedule);

export default router;
