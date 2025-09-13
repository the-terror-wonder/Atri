import Assignment from '../models/Assignment.js';
import Classroom from '../models/Classroom.js';
import AssignmentSubmission from '../models/AssignmentSubmission.js';

// @desc    Create an assignment for a classroom
// @route   POST /api/classrooms/:classroomId/assignments
// @access  Private/Faculty
const createAssignment = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const { classroomId } = req.params;

  const classroom = await Classroom.findById(classroomId);

  if (classroom) {
    // SECURITY CHECK: Make sure the logged-in user is the faculty of this classroom
    if (classroom.faculty.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized to add assignments to this classroom');
    }

    const assignment = new Assignment({
      title,
      description,
      dueDate,
      classroom: classroomId,
      faculty: req.user._id,
    });

    const createdAssignment = await assignment.save();
    res.status(201).json(createdAssignment);
  } else {
    res.status(404);
    throw new Error('Classroom not found');
  }
};

// @desc    Get all assignments for a classroom
// @route   GET /api/classrooms/:classroomId/assignments
// @access  Private
const getAssignmentsForClassroom = async (req, res) => {
  const { classroomId } = req.params;

  // We could add a security check here too, to ensure the user is part of the class
  const assignments = await Assignment.find({ classroom: classroomId });
  res.json(assignments);
};

// @desc    Submit an assignment
// @route   POST /api/assignments/:id/submit
// @access  Private/Student
const submitAssignment = async (req, res) => {
  const { submissionContent } = req.body;
  const assignmentId = req.params.id;

  const assignment = await Assignment.findById(assignmentId);

  if (assignment) {
    if (new Date() > new Date(assignment.dueDate)) {
      res.status(400);
      throw new Error('The deadline for this assignment has passed.');
    }
    // Check if the student has already submitted
    const existingSubmission = await AssignmentSubmission.findOne({
      assignment: assignmentId,
      student: req.user._id,
    });

    if (existingSubmission) {
      res.status(400);
      throw new Error('You have already submitted this assignment');
    }

    const submission = await AssignmentSubmission.create({
      assignment: assignmentId,
      student: req.user._id,
      submissionContent,
    });

    res.status(201).json({ message: 'Assignment submitted successfully', submission });
  } else {
    res.status(404);
    throw new Error('Assignment not found');
  }
};

export { createAssignment, getAssignmentsForClassroom , submitAssignment };