import express from 'express';
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from '../controllers/certificateController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCertificates);
router.post('/', protect, adminOnly, createCertificate);
router.put('/:id', protect, adminOnly, updateCertificate);
router.delete('/:id', protect, adminOnly, deleteCertificate);

export default router;
