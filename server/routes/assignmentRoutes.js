import express from 'express';
import { createAssignment, getAssignmentsForClassroom } from '../controllers/assignmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true }); 

router.route('/')
  .post(protect, authorize('faculty', 'admin'), createAssignment)
  .get(protect, getAssignmentsForClassroom);

export default router;