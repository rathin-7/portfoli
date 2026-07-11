import Resume from '../models/Resume.js';
import File from '../models/File.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true });
    if (!resume) return res.json(null);
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLatestResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true, fileUrl: { $exists: true, $ne: null } }).sort('-updatedAt');
    if (!resume || !resume.fileUrl) {
      return res.status(404).json({ message: 'No resume available' });
    }
    res.json({
      fileUrl: resume.fileUrl,
      fileName: resume.fileName,
      updatedAt: resume.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true, fileUrl: { $exists: true, $ne: null } }).sort('-updatedAt');
    if (!resume || !resume.fileUrl) {
      return res.status(404).json({ message: 'No resume available' });
    }

    const filename = resume.fileName || 'Radhinraj_Resume.pdf';
    const filePath = path.join(uploadDir, path.basename(resume.fileUrl));

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Resume file not found on server' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const previewResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true, fileUrl: { $exists: true, $ne: null } }).sort('-updatedAt');
    if (!resume || !resume.fileUrl) {
      return res.status(404).json({ message: 'No resume available' });
    }

    const filePath = path.join(uploadDir, path.basename(resume.fileUrl));
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Resume file not found on server' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${resume.fileName || 'resume.pdf'}"`);
    res.setHeader('Cache-Control', 'public, max-age=3600');

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const existingResume = await Resume.findOne({ active: true });
    if (existingResume?.fileId) {
      const oldFile = await File.findById(existingResume.fileId);
      if (oldFile) {
        const oldPath = path.join(uploadDir, oldFile.fileName);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        await File.findByIdAndDelete(oldFile._id);
      }
    }

    const file = await File.create({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype,
      size: req.file.size,
      category: 'resume',
      description: 'Resume PDF',
      isPublic: true,
      uploadedBy: req.user?._id,
    });

    const resume = await Resume.findOneAndUpdate(
      { active: true },
      { fileUrl: file.fileUrl, fileName: file.originalName, fileId: file._id },
      { upsert: true, new: true }
    );

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true });
    if (!resume) return res.status(404).json({ message: 'No resume found' });

    if (resume.fileId) {
      const file = await File.findById(resume.fileId);
      if (file) {
        const filePath = path.join(uploadDir, file.fileName);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        await File.findByIdAndDelete(file._id);
      }
    }

    await Resume.findByIdAndDelete(resume._id);
    res.json({ message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate({ active: true }, req.body, { new: true, upsert: true });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
