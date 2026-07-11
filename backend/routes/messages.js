import express from 'express';
import { getMessages, sendMessage, markRead, deleteMessage } from '../controllers/messageController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', protect, adminOnly, getMessages);
router.post('/', [body('name').notEmpty(), body('email').isEmail(), body('message').notEmpty()], sendMessage);
router.put('/:id/read', protect, adminOnly, markRead);
router.delete('/:id', protect, adminOnly, deleteMessage);

export default router;
