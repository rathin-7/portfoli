import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: Date },
  image: { type: String },
  url: { type: String },
  description: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);
