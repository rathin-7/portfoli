import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Social', socialSchema);
