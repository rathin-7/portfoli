import File from '../models/File.js';
import Resume from '../models/Resume.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

export const getFiles = async (req, res) => {
  try {
    const { category, search, sort = '-createdAt', page = 1, limit = 50 } = req.query;
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (search) filter.$or = [
      { originalName: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
    const files = await File.find(filter).sort(sort).skip((page - 1) * limit).limit(parseInt(limit));
    const total = await File.countDocuments(filter);
    res.json({ files, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const category = req.body.category || 'others';

    if (category === 'resume') {
      const existing = await Resume.findOne({ active: true });
      if (existing?.fileId) {
        const oldFile = await File.findById(existing.fileId);
        if (oldFile) {
          const oldPath = path.join(uploadDir, oldFile.fileName);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
          await File.findByIdAndDelete(oldFile._id);
        }
      }
    }

    const file = await File.create({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype,
      size: req.file.size,
      category,
      description: req.body.description || '',
      isPublic: req.body.isPublic === 'true',
      uploadedBy: req.user?._id,
    });

    if (category === 'resume') {
      await Resume.findOneAndUpdate(
        { active: true },
        { fileUrl: file.fileUrl, fileName: file.originalName, fileId: file._id },
        { upsert: true, new: true }
      );
    }

    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFile = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const replaceFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const existing = await File.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'File not found' });

    const oldPath = path.join(uploadDir, existing.fileName);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

    existing.originalName = req.file.originalname;
    existing.fileName = req.file.filename;
    existing.fileUrl = `/uploads/${req.file.filename}`;
    existing.mimeType = req.file.mimetype;
    existing.size = req.file.size;
    await existing.save();

    if (existing.category === 'resume') {
      await Resume.findOneAndUpdate(
        { active: true },
        { fileUrl: existing.fileUrl, fileName: existing.originalName, fileId: existing._id },
        { upsert: true, new: true }
      );
    }

    res.json(existing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    const filePath = path.join(uploadDir, file.fileName);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    if (file.category === 'resume') {
      await Resume.findOneAndDelete({ fileId: file._id });
    }

    res.json({ message: 'File deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStorageStats = async (req, res) => {
  try {
    const totalFiles = await File.countDocuments();
    const byCategory = await File.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 }, totalSize: { $sum: '$size' } } },
    ]);
    const totalSize = await File.aggregate([{ $group: { _id: null, total: { $sum: '$size' } } }]);
    res.json({
      totalFiles,
      totalSize: totalSize[0]?.total || 0,
      byCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
