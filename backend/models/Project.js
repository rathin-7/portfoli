import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  techStack: [{ type: String }],
  features: [{ type: String }],
  challenges: [{ type: String }],
  architecture: { type: String },
  liveUrl: { type: String },
  githubUrl: { type: String },
  category: { type: String, default: 'fullstack' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
