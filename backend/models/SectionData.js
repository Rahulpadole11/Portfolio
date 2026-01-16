import mongoose from 'mongoose';

const SectionDataSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      enum: ['about', 'skills', 'contact', 'experience'],
      unique: true,
      required: true,
    },
    data: mongoose.Schema.Types.Mixed, // Flexible structure for different sections
  },
  { timestamps: true }
);

export default mongoose.model('SectionData', SectionDataSchema);
