import { Router } from 'express';
import { createCandidate,getCandidateById,getCandidates,updateCandidate,deleteCandidate } from '../controllers/candidate.controller';
const router = Router();

router.route('/').get(getCandidates).post(createCandidate);

router.route('/:id').get(getCandidateById).patch(updateCandidate).delete(deleteCandidate);

export default router;
