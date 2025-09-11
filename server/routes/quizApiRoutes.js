import express from 'express';
const router = express.Router();
import { getQuizById } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/:id').get(protect, getQuizById);

export default router;