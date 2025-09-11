import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const StudentManagementSection = ({ classroom, onStudentEnrolled }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const enrollHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: updatedClassroom } = await API.post(
        `/api/classrooms/${classroom._id}/enroll`,
        { email }
      );
      toast.success(`Student ${email} enrolled successfully!`);
      setEmail('');
      onStudentEnrolled(updatedClassroom);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to enroll student.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Student Management</h2>

      <form onSubmit={enrollHandler} className="mb-6 flex space-x-2">
        <input
          type="email"
          placeholder="Enter student email to enroll"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        <button type="submit" disabled={isLoading} className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400">
          {isLoading ? 'Enrolling...' : 'Enroll'}
        </button>
      </form>

      <div>
        <h3 className="text-lg font-medium mb-2">Enrolled Students</h3>
        <div className="space-y-2">
          {classroom.students && classroom.students.length > 0 ? (
            classroom.students.map((student) => (
              <div key={student._id} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                <span>{student.name}</span>
                <span className="text-sm text-gray-500">{student.email}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No students are enrolled in this class yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentManagementSection;