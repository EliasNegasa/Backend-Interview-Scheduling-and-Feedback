import { Router } from 'express';
import { createCandidate,getCandidateById,getCandidates,updateCandidate,deleteCandidate } from '../controllers/candidate.controller';
const router = Router();
import auth from '../middlewares/auth';
import RecruiterAuth from '../middlewares/RecruiterAuth';

router.route('/').get(auth,RecruiterAuth,getCandidates).post(auth,RecruiterAuth,createCandidate);

router.route('/:id').get(auth,RecruiterAuth,getCandidateById).patch(auth,RecruiterAuth,updateCandidate).delete(auth,RecruiterAuth,deleteCandidate);

export default router;
