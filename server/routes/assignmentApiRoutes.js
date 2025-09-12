import express from 'express';
const router = express.Router();
import { submitAssignment } from '../controllers/assignmentController.js';
import { getAssignmentSubmissions } from '../controllers/submissionController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

router.route('/:id/submit').post(protect, authorize('student'), submitAssignment);
router.route('/:id/submissions').get(protect, authorize('faculty'), getAssignmentSubmissions); // 👈 ADD THIS

export default router;