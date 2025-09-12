import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Classroom',
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;