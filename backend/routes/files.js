import express from 'express';
import { getFiles, getFile, uploadFile, updateFile, replaceFile, deleteFile, getStorageStats } from '../controllers/fileController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { uploadSingle } from '../middleware/upload.js';

const router = express.Router();

router.get('/stats', protect, adminOnly, getStorageStats);
router.get('/', protect, adminOnly, getFiles);
router.get('/:id', protect, adminOnly, getFile);
router.post('/', protect, adminOnly, uploadSingle, uploadFile);
router.put('/:id', protect, adminOnly, updateFile);
router.put('/:id/replace', protect, adminOnly, uploadSingle, replaceFile);
router.delete('/:id', protect, adminOnly, deleteFile);

export default router;
