import express from 'express';
const router = express.Router();
import { registerUser,loginUser ,getUserProfile,getUsers} from '../controllers/userController.js';
import {protect,authorize} from '../middleware/authMiddleware.js';

router.route('/')
  .post(registerUser)
  .get(protect, authorize('admin'), getUsers);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;