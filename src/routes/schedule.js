import { Router } from 'express';
import {
  createSchedule,
  deleteSchedule,
  getScheduleById,
  getSchedules,
  updateSchedule,
} from '../controllers/schedule';
import auth from '../middlewares/auth';
import RecruiterAuth from '../middlewares/RecruiterAuth';

const router = Router();

router.route('/').get(auth,getSchedules).post(auth,RecruiterAuth,createSchedule);

router
  .route('/:id')
  .get(auth,getScheduleById)
  .patch(auth,RecruiterAuth,updateSchedule)
  .delete(auth,RecruiterAuth,deleteSchedule);

export default router;
