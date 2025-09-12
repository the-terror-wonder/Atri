import QuizSubmission from '../models/QuizSubmission.js';
import AssignmentSubmission from '../models/AssignmentSubmission.js';
import Assignment from '../models/Assignment.js';

// @desc    Get a logged-in student's quiz submissions
// @route   GET /api/submissions/my-quizzes
// @access  Private/Student
const getMyQuizSubmissions = async (req, res) => {
  const submissions = await QuizSubmission.find({
      student: req.user._id
    })
    .populate('quiz', 'title')
    .sort({
      createdAt: -1
    });

  res.json(submissions);
};


// @desc    Get all submissions for a single assignment
// @route   GET /api/assignments/:id/submissions
// @access  Private/Faculty
const getAssignmentSubmissions = async (req, res) => {
  const submissions = await AssignmentSubmission.find({
      assignment: req.params.id
    })
    .populate('student', 'name email');

  // We can add a security check here later to ensure only the correct faculty can see this
  res.json(submissions);
};

// @desc    Grade a student's assignment submission
// @route   PUT /api/submissions/assignment/:id/grade
// @access  Private/Faculty
const gradeAssignmentSubmission = async (req, res) => {
  const {
    grade
  } = req.body;
  const submission = await AssignmentSubmission.findById(req.params.id);

  if (submission) {
    // We could add a security check here to ensure req.user is the faculty
    submission.grade = grade;
    const updatedSubmission = await submission.save();
    res.json(updatedSubmission);
  } else {
    res.status(404);
    throw new Error('Submission not found');
  }
};

// @desc    Get a logged-in student's assignment submissions
// @route   GET /api/submissions/my-assignments
// @access  Private/Student
const getMyAssignmentSubmissions = async (req, res) => {
  const submissions = await AssignmentSubmission.find({
      student: req.user._id
    })
    .populate('assignment', 'title') // Get the assignment title
    .sort({
      createdAt: -1
    });

  res.json(submissions);
};

export {
  getMyQuizSubmissions,
  getAssignmentSubmissions,
  gradeAssignmentSubmission,
  getMyAssignmentSubmissions
};