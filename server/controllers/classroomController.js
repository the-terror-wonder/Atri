import Classroom from '../models/Classroom.js';

// @desc    Create a new classroom
// @route   POST /api/classrooms
// @access  Private/Faculty or Admin
const createClassroom = async (req, res) => {
  const { name } = req.body;

  const classroom = new Classroom({
    name,
    faculty: req.user._id, // The logged-in user is the faculty
  });

  const createdClassroom = await classroom.save();
  res.status(201).json(createdClassroom);
};

// @desc    Get classrooms for the logged-in faculty
// @route   GET /api/classrooms
// @access  Private/Faculty
const getMyClassrooms = async (req, res) => {
  const classrooms = await Classroom.find({ faculty: req.user._id });
  res.json(classrooms);
};

export { createClassroom, getMyClassrooms };