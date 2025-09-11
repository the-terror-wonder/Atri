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

// @desc    Get a single classroom by ID
// @route   GET /api/classrooms/:id
// @access  Private
const getClassroomById = async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);

  if (classroom) {
    // We should also add a check here to make sure the user is part of this class
    res.json(classroom);
  } else {
    res.status(404);
    throw new Error('Classroom not found');
  }
};

export { createClassroom, getMyClassrooms,getClassroomById };