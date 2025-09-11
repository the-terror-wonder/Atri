import express from 'express';
const router = express.Router();
import { submitAssignment } from '../controllers/assignmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

router.route('/:id/submit').post(protect, authorize('student'), submitAssignment);

export default router;