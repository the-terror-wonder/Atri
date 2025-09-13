import Classroom from '../models/Classroom.js';
import Assignment from '../models/Assignment.js';
import Quiz from '../models/Quiz.js';

// @desc    Get all calendar events for a student
// @route   GET /api/events/my-calendar
// @access  Private/Student
const getMyCalendarEvents = async (req, res) => {
  // Find all classrooms the student is enrolled in
  const classrooms = await Classroom.find({ students: req.user._id });
  const classroomIds = classrooms.map(c => c._id);

  // Find all assignments and quizzes in those classrooms
  const assignments = await Assignment.find({ classroom: { $in: classroomIds } });
  const quizzes = await Quiz.find({ classroom: { $in: classroomIds } });

  // Format the data into a structure that the calendar can easily use
  const events = [];

  assignments.forEach(a => {
    events.push({
      title: `Assignment Due: ${a.title}`,
      start: a.dueDate,
      end: a.dueDate,
      allDay: true, // Mark as an all-day event
      resource: { type: 'assignment', id: a._id, classroomId: a.classroom }
    });
  });

  quizzes.forEach(q => {
    events.push({
      title: `Quiz Available: ${q.title}`,
      start: q.availableFrom,
      end: q.availableUntil,
      allDay: false,
      resource: { type: 'quiz', id: q._id, classroomId: q.classroom }
    });
  });

  res.json(events);
};

export { getMyCalendarEvents };