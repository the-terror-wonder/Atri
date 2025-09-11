import mongoose from 'mongoose';

const quizSubmissionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Quiz',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  answers: {
    type: Map, 
    of: String,
  },
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const QuizSubmission = mongoose.model('QuizSubmission', quizSubmissionSchema);

export default QuizSubmission;