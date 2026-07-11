import express from 'express';
import { getResume, getLatestResume, downloadResume, previewResume, uploadResume, deleteResume, updateResume } from '../controllers/resumeController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { uploadSingle } from '../middleware/upload.js';

const router = express.Router();

router.get('/latest', getLatestResume);
router.get('/download', downloadResume);
router.get('/preview', previewResume);
router.get('/', getResume);
router.post('/', protect, adminOnly, uploadSingle, uploadResume);
router.put('/', protect, adminOnly, updateResume);
router.delete('/', protect, adminOnly, deleteResume);

export default router;
