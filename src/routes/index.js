import { Router } from 'express';
import userRouter from './user';
import clientRouter from './client';

const router = Router();

router.use('/users', userRouter);
router.use('/clients', clientRouter);

export default router;
