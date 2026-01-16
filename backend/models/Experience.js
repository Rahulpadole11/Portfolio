import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  achievements: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Experience', experienceSchema);
