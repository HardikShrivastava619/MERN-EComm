import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Removes whitespace from both ends of a string
  },
  slug: {
    type: String,
    lowercase: true,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

export default mongoose.model('Category', categorySchema);
