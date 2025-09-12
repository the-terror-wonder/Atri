import express from 'express';
const router = express.Router({ mergeParams: true });
import { createNotice, getNoticesForClassroom } from '../controllers/noticeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

router.route('/')
  .post(protect, authorize('faculty', 'admin'), createNotice)
  .get(protect, getNoticesForClassroom);

export default router;