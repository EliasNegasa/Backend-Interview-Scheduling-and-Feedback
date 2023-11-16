import { Router } from 'express';
import userRouter from './user';
import clientRouter from './client';
import scheduleRouter from './schedule';
import candidateRourer from './candidate';

const router = Router();

router.use('/users', userRouter);
router.use('/clients', clientRouter);
router.use('/schedules', scheduleRouter);
router.use('/candidates', candidateRourer);

export default router;
