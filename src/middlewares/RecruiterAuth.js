import asyncHandler from 'express-async-handler';
import User from '../models/user';
import { decodeToken } from '../utils/decode-token';

const checkUserRole = (requiredRole) => {
  return asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    const { id } = decodeToken(token);

    const user = await User.findById(id);

    if (
      user.role.toUpperCase() === requiredRole.toUpperCase() ||
      user.role.toUpperCase() === 'SUPER ADMIN'
    ) {
      next();
      return;
    } else {
      res.status(403);
      throw new Error(`Not Authorized: ${requiredRole} role is required!`);
    }
  });
};

export const isRecruiter = checkUserRole('Recruiter');
export const isInterviewer = checkUserRole('Interviewer');
export const isCandidate = checkUserRole('Candidate');
