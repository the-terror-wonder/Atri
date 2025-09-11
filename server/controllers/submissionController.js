import QuizSubmission from '../models/QuizSubmission.js';

// @desc    Get a logged-in student's quiz submissions
// @route   GET /api/submissions/my-quizzes
// @access  Private/Student
const getMyQuizSubmissions = async (req, res) => {
  const submissions = await QuizSubmission.find({ student: req.user._id })
    .populate('quiz', 'title')
    .sort({ createdAt: -1 });

  res.json(submissions);
};

export { getMyQuizSubmissions };