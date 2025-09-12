import express from 'express';
const router = express.Router();
import { getMyQuizSubmissions, gradeAssignmentSubmission,getMyAssignmentSubmissions } from '../controllers/submissionController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

router.route('/my-quizzes').get(protect, authorize('student'), getMyQuizSubmissions);
router.route('/my-assignments').get(protect, authorize('student'), getMyAssignmentSubmissions);
router.route('/assignment/:id/grade').put(protect, authorize('faculty'), gradeAssignmentSubmission);

export default router;