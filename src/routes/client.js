import { Router } from 'express';
import {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient,
} from '../controllers/client';
import { auth } from '../middlewares/auth';
// import RecruiterAuth from '../middlewares/RecruiterAuth';

const router = Router();

router.route('/').all(auth).get(getClients).post(createClient);

router
  .route('/:id')
  .all(auth)
  .get(getClientById)
  .patch(updateClient)
  .delete(deleteClient);

export default router;
