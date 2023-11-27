import { Router } from 'express';
import {
  createCandidate,
  getCandidateById,
  getCandidates,
  updateCandidate,
  deleteCandidate,
} from '../controllers/candidate';
const router = Router();
import { auth } from '../middlewares/auth';
// import RecruiterAuth from '../middlewares/RecruiterAuth';

router.route('/').all(auth).get(getCandidates).post(createCandidate);

router
  .route('/:id')
  .all(auth)
  .get(getCandidateById)
  .patch(updateCandidate)
  .delete(deleteCandidate);

export default router;
