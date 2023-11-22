import { Router } from 'express';
import {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient,
} from '../controllers/client';
import auth from '../middlewares/auth';
import RecruiterAuth from '../middlewares/RecruiterAuth';

const router = Router();

router.route('/').get(auth,RecruiterAuth,getClients).post(auth,RecruiterAuth,createClient);

router
  .route('/:id',auth,RecruiterAuth)
  .get(auth,RecruiterAuth,getClientById)
  .patch(auth,RecruiterAuth,updateClient)
  .delete(auth,RecruiterAuth,deleteClient);

export default router;
