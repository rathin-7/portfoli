import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  category: {
    type: String,
    enum: ['resume', 'certificates', 'documents', 'project-files', 'images', 'others'],
    default: 'others',
  },
  description: { type: String, default: '' },
  isPublic: { type: Boolean, default: false },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

fileSchema.index({ originalName: 'text', description: 'text' });

export default mongoose.model('File', fileSchema);
