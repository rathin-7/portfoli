import express from 'express';
import { uploadFile } from '../controllers/uploadController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/', protect, adminOnly, upload.single('file'), uploadFile);

export default router;
