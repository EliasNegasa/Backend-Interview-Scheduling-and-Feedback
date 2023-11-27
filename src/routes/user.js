import { Router } from 'express';
import {
  createUser,
  LoginUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user';
import auth from '../middlewares/auth';
import RecruiterAuth from '../middlewares/RecruiterAuth';

const router = Router();

router.route('/login').post(LoginUser)
router.route('/').get(auth,RecruiterAuth,getUsers).post(auth,RecruiterAuth,createUser);
router.route('/:id').get(auth,RecruiterAuth,getUserById).patch(auth,RecruiterAuth,updateUser).delete(auth,RecruiterAuth,deleteUser);

export default router;
