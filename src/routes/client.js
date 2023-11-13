import { Router } from 'express';
import {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient,
} from '../controllers/client';

const router = Router();

router.route('/').get(getClients).post(createClient);

router
  .route('/:id')
  .get(getClientById)
  .patch(updateClient)
  .delete(deleteClient);

export default router;
