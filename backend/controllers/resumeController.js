import Resume from '../models/Resume.js';
import File from '../models/File.js';

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true }).select('-fileData');
    if (!resume) return res.json(null);
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLatestResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true, fileData: { $exists: true, $ne: null } }).sort('-updatedAt');
    if (!resume || !resume.fileData) {
      return res.status(404).json({ message: 'No resume available' });
    }
    res.json({
      fileUrl: `/api/resume/download`,
      fileName: resume.fileName,
      updatedAt: resume.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true, fileData: { $exists: true, $ne: null } }).sort('-updatedAt');
    if (!resume || !resume.fileData) {
      return res.status(404).json({ message: 'No resume available' });
    }

    const filename = resume.fileName || 'Radhinraj_Resume.pdf';
    res.setHeader('Content-Type', resume.mimeType || 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.send(resume.fileData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const previewResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true, fileData: { $exists: true, $ne: null } }).sort('-updatedAt');
    if (!resume || !resume.fileData) {
      return res.status(404).json({ message: 'No resume available' });
    }

    res.setHeader('Content-Type', resume.mimeType || 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${resume.fileName || 'resume.pdf'}"`);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(resume.fileData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const existingResume = await Resume.findOne({ active: true });
    if (existingResume?.fileId) {
      await File.findByIdAndDelete(existingResume.fileId).catch(() => {});
    }

    const file = await File.create({
      originalName: req.file.originalname,
      fileName: req.file.originalname,
      fileUrl: 'mongodb-stored',
      mimeType: req.file.mimetype,
      size: req.file.size,
      category: 'resume',
      description: 'Resume PDF',
      isPublic: true,
      uploadedBy: req.user?._id,
    });

    const resume = await Resume.findOneAndUpdate(
      { active: true },
      {
        fileUrl: 'mongodb-stored',
        fileName: file.originalName,
        fileId: file._id,
        fileData: req.file.buffer,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
      },
      { upsert: true, new: true }
    );

    const response = resume.toObject();
    delete response.fileData;

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true });
    if (!resume) return res.status(404).json({ message: 'No resume found' });

    if (resume.fileId) {
      await File.findByIdAndDelete(resume.fileId).catch(() => {});
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
