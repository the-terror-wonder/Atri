import Notice from '../models/Notice.js';
import Classroom from '../models/Classroom.js';

// @desc    Create a notice for a classroom
// @route   POST /api/classrooms/:classroomId/notices
// @access  Private/Faculty
const createNotice = async (req, res) => {
  const { content } = req.body;
  const { classroomId } = req.params;

  const classroom = await Classroom.findById(classroomId);

  if (classroom && classroom.faculty.toString() === req.user._id.toString()) {
    const notice = await Notice.create({
      content,
      classroom: classroomId,
      faculty: req.user._id,
    });
    res.status(201).json(notice);
  } else {
    res.status(401);
    throw new Error('User not authorized or Classroom not found');
  }
};

// @desc    Get all notices for a classroom
// @route   GET /api/classrooms/:classroomId/notices
// @access  Private
const getNoticesForClassroom = async (req, res) => {
  const notices = await Notice.find({ classroom: req.params.classroomId }).sort({ createdAt: -1 });
  res.json(notices);
};

export { createNotice, getNoticesForClassroom };