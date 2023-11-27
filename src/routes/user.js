import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user';
import { auth } from '../middlewares/auth';
// import RecruiterAuth from '../middlewares/RecruiterAuth';

const router = Router();

router.route('/').all(auth).get(getUsers).post(createUser);

router
  .route('/:id')
  .all(auth)
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
