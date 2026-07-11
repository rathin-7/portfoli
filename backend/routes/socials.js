import express from 'express';
import { getSocials, updateSocials } from '../controllers/socialController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSocials);
router.put('/', protect, adminOnly, updateSocials);

export default router;
