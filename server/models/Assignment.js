import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        reuired: true,
    },
    description: {
        type: String,
        reuired: true,
    },
    dueDate: {
        type: Date,
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Classroom'
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
}, {
    timestamps: true,
});

const Assignment = mongoose.model('Assignment',assignmentSchema);

export default Assignment;