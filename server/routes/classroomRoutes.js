import express from 'express';
import assignmentRoutes from './assignmentRoutes.js';
import { createClassroom,getMyClassrooms } from '../controllers/classroomController.js';
import {protect,authorize} from '../middleware/authMiddleware.js'

const router = express.Router();

router.use('/:classroomId/assignments', assignmentRoutes);

router.route('/')
.post(protect,authorize('faculty','admin'),createClassroom)
.get(protect,authorize('faculty'),getMyClassrooms);

export default router;