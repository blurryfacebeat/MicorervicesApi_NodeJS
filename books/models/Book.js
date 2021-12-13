import mongoose from 'mongoose';

const Book = new mongoose.Schema({
  author: { type: String, unique: false, required: true },
  name: { type: String,  unique: true, required: true, },
});

export default mongoose.model('Book', Book);
