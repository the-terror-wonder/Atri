import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String], 
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const quizSchema = new mongoose.Schema({
  title: {
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
  questions: [questionSchema], 
  availableFrom: {
    type: Date,
    required: true,
  },
  availableUntil: { 
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;