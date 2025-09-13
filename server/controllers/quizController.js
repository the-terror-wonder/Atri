import Quiz from '../models/Quiz.js';
import Classroom from '../models/Classroom.js';
import QuizSubmission from '../models/QuizSubmission.js';

// @desc    Create a quiz for a classroom
// @route   POST /api/classrooms/:classroomId/quizzes
// @access  Private/Faculty
const createQuiz = async (req, res) => {
  const {
    title,
    questions,
    availableFrom,
    availableUntil
  } = req.body;
  const {
    classroomId
  } = req.params;

  const classroom = await Classroom.findById(classroomId);

  if (classroom) {
    // SECURITY CHECK: Ensure the logged-in user owns this classroom
    if (classroom.faculty.toString() !== req.user._id.toString()) {
      res.status(401).json({
        msg: 'User not authorized'
      });
    }

    const quiz = new Quiz({
      title,
      questions,
      availableFrom,
      availableUntil,
      classroom: classroomId,
      faculty: req.user._id,
    });

    const createdQuiz = await quiz.save();
    res.status(201).json(createdQuiz);
  } else {
    res.status(404).json({
      msg: 'Classroom not found'
    });
  }
};

// @desc    Submit a quiz and get the score
// @route   POST /api/quizzes/:id/submit
// @access  Private/Student
const submitQuiz = async (req, res) => {
  const {
    answers
  } = req.body;
  const quizId = req.params.id;

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  const now = new Date();
  if (now < new Date(quiz.availableFrom) || now > new Date(quiz.availableUntil)) {
    res.status(403);
    throw new Error('This quiz is not currently available for submission.');
  }

  // Calculate score
  let score = 0;
  quiz.questions.forEach((question) => {
    // Check if the student's answer for this question matches the correct answer
    if (answers[question._id.toString()] === question.correctAnswer) {
      score++;
    }
  });

  // Save the submission
  const submission = await QuizSubmission.create({
    quiz: quizId,
    student: req.user._id,
    answers,
    score,
    totalQuestions: quiz.questions.length,
  });

  res.status(201).json({
    message: 'Quiz submitted successfully!',
    score: submission.score,
    totalQuestions: submission.totalQuestions,
  });
};

// @desc    Get all quizzes for a classroom
// @route   GET /api/classrooms/:classroomId/quizzes
// @access  Private
const getQuizzesForClassroom = async (req, res) => {
  const quizzes = await Quiz.find({
    classroom: req.params.classroomId
  });
  res.json(quizzes);
};

// @desc    Get a single quiz by ID
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizById = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (quiz) {
    const now = new Date();
    if (req.user.role === 'student' && (now < new Date(quiz.availableFrom) || now > new Date(quiz.availableUntil))) {
      res.status(403);
      throw new Error('This quiz is not currently available.');
    }
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
};

export {
  createQuiz,
  getQuizzesForClassroom,
  getQuizById,
  submitQuiz
};