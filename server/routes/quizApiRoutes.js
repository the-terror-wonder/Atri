import express from 'express';
const router = express.Router();
import { getQuizById,submitQuiz} from '../controllers/quizController.js';
import { protect,authorize } from '../middleware/authMiddleware.js';

router.route('/:id').get(protect, getQuizById);
router.route('/:id/submit').post(protect, authorize('student'), submitQuiz);


export default router;