import express from 'express';
import { login, getMe, createAdmin } from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/setup', createAdmin);
router.get('/me', protect, getMe);

export default router;
