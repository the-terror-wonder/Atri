import express from 'express';
const router = express.Router({ mergeParams: true });
import { createQuiz, getQuizzesForClassroom } from '../controllers/quizController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

router.route('/')
  .post(protect, authorize('faculty', 'admin'), createQuiz)
  .get(protect, getQuizzesForClassroom);

export default router;