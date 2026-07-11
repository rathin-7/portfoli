import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  location: { type: String },
  description: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Education', educationSchema);
