import { Router } from 'express';
import { profile, signIn, signOut, signUp } from '../controllers/auth';
import { auth } from '../middlewares/auth';

const router = Router();

router.route('/login').post(signIn);
router.route('/signup').post(signUp);
router.route('/profile').get(auth, profile);
router.route('/logout').post(signOut);

export default router;
