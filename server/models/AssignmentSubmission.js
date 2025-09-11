import mongoose from 'mongoose';

const assignmentSubmissionSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Assignment',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  submissionContent: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
  },
}, {
  timestamps: true,
});

const AssignmentSubmission = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);

export default AssignmentSubmission;