import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  title: { type: String, default: 'Resume' },
  fileUrl: { type: String },
  fileName: { type: String },
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
