import Quiz from '../models/Quiz.js';
import Classroom from '../models/Classroom.js';

// @desc    Create a quiz for a classroom
// @route   POST /api/classrooms/:classroomId/quizzes
// @access  Private/Faculty
const createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  const { classroomId } = req.params;

  const classroom = await Classroom.findById(classroomId);

  if (classroom) {
    // SECURITY CHECK: Ensure the logged-in user owns this classroom
    if (classroom.faculty.toString() !== req.user._id.toString()) {
      res.status(401).json({msg : 'User not authorized'});
    }

    const quiz = new Quiz({
      title,
      questions,
      classroom: classroomId,
      faculty: req.user._id,
    });

    const createdQuiz = await quiz.save();
    res.status(201).json(createdQuiz);
  } else {
    res.status(404).json({msg : 'Classroom not found'});
  }
};

// @desc    Get all quizzes for a classroom
// @route   GET /api/classrooms/:classroomId/quizzes
// @access  Private
const getQuizzesForClassroom = async (req, res) => {
  const quizzes = await Quiz.find({ classroom: req.params.classroomId });
  res.json(quizzes);
};

export { createQuiz, getQuizzesForClassroom };