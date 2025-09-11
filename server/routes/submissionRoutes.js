import express from 'express';
const router = express.Router();
import { getMyQuizSubmissions } from '../controllers/submissionController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

router.route('/my-quizzes').get(protect, authorize('student'), getMyQuizSubmissions);

export default router;