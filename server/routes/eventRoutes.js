import express from 'express';
const router = express.Router();
import { getMyCalendarEvents } from '../controllers/eventController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

router.route('/my-calendar').get(protect, authorize('student'), getMyCalendarEvents);

export default router;