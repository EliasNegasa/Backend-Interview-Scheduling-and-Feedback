import { Router } from 'express';
import userRouter from './user';
import clientRouter from './client';
import scheduleRouter from './schedule';

const router = Router();

router.use('/users', userRouter);
router.use('/clients', clientRouter);
router.use('/schedules', scheduleRouter);

export default router;
