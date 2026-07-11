import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['frontend', 'backend', 'database', 'tools'] },
  icon: { type: String },
  level: { type: Number, min: 0, max: 100, default: 80 },
  color: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
