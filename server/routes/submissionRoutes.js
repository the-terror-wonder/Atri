import express from 'express';
const router = express.Router();
import { getMyQuizSubmissions, gradeAssignmentSubmission } from '../controllers/submissionController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

router.route('/my-quizzes').get(protect, authorize('student'), getMyQuizSubmissions);
router.route('/assignment/:id/grade').put(protect, authorize('faculty'), gradeAssignmentSubmission);

export default router;