import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
} from '../controllers/userController.js';
import {
  protect,
  authorize
} from '../middleware/authMiddleware.js';

router.route('/')
  .post(registerUser)
  .get(protect, authorize('admin'), getUsers);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router
  .route('/:id')
  .get(protect, authorize('admin'), getUserById)
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

export default router;