import mongoose from 'mongoose';

const User = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  roles: [{ type: String, ref: 'Role' }]
});

export default mongoose.model('User', User);
