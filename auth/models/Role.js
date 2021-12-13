import mongoose from 'mongoose';

const Role = new mongoose.Schema({
  value: { type: String, unique: true, default: 'User' }
});

export default mongoose.model('Role', Role);
