import express from 'express';
import assignmentRoutes from './assignmentRoutes.js';
import quizRoutes from './quizRoutes.js';
import {
    createClassroom,
    getMyClassrooms,
    getClassroomById,
    enrollStudent,
    getEnrolledClassrooms,
    getAllClassrooms,
    deleteClassroom
} from '../controllers/classroomController.js';
import {
    protect,
    authorize
} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/enrolled').get(protect, authorize('student'), getEnrolledClassrooms);

router.use('/:classroomId/assignments', assignmentRoutes);
router.use('/:classroomId/quizzes', quizRoutes);
router.route('/all').get(protect, authorize('admin'), getAllClassrooms);
router.route('/')

    .post(protect, authorize('faculty', 'admin'), createClassroom)
    .get(protect, authorize('faculty'), getMyClassrooms);
router.route('/:id')
  .get(protect, getClassroomById)
  .delete(protect, authorize('admin'), deleteClassroom);
router.route('/:id/enroll').post(protect, authorize('faculty', 'admin'), enrollStudent);


export default router;