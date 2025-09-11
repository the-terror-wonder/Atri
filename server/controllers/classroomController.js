import Classroom from '../models/Classroom.js';
import User from '../models/User.js';


// @desc    Enroll a student in a classroom
// @route   POST /api/classrooms/:id/enroll
// @access  Private/Faculty
const enrollStudent = async (req, res) => {
  const {
    email
  } = req.body;
  const classroomId = req.params.id;

  const classroom = await Classroom.findById(classroomId);
  const student = await User.findOne({
    email,
    role: 'student'
  });

  if (!student) {
    res.status(404);
    throw new Error('Student with this email not found');
  }

  if (classroom) {
    // SECURITY CHECK: Make sure the logged-in user is the faculty of this classroom
    if (classroom.faculty.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized for this classroom');
    }

    // Check if the student is already enrolled
    const isEnrolled = classroom.students.find(
      (s) => s.toString() === student._id.toString()
    );

    if (isEnrolled) {
      res.status(400);
      throw new Error('Student is already enrolled in this class');
    }

    classroom.students.push(student._id);
    await classroom.save();
    res.json(classroom);
  } else {
    res.status(404);
    throw new Error('Classroom not found');
  }
};

// @desc    Create a new classroom
// @route   POST /api/classrooms
// @access  Private/Faculty or Admin
const createClassroom = async (req, res) => {
  const {
    name
  } = req.body;

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
  const classrooms = await Classroom.find({
    faculty: req.user._id
  });
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

export {
  createClassroom,
  getMyClassrooms,
  getClassroomById,
  enrollStudent
};