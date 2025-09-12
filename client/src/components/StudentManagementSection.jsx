import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const StudentManagementSection = ({ classroom, onStudentEnrolled }) => {
  const [activeSubTab, setActiveSubTab] = useState('view');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const enrollHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: updatedClassroom } = await API.post(`/api/classrooms/${classroom._id}/enroll`, { email });
      toast.success(`Student ${email} enrolled successfully!`);
      setEmail('');
      onStudentEnrolled(updatedClassroom);
      setActiveSubTab('view'); // Switch back to view roster
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to enroll student.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-stone-700">👥 Student Roster</h2>
        <div className="flex space-x-2 p-1 bg-stone-100 rounded-lg">
          <button onClick={() => setActiveSubTab('view')} className={`px-3 py-1 text-sm font-semibold rounded-md ${activeSubTab === 'view' ? 'bg-white shadow' : 'text-stone-600'}`}>
            View Roster
          </button>
          <button onClick={() => setActiveSubTab('enroll')} className={`px-3 py-1 text-sm font-semibold rounded-md ${activeSubTab === 'enroll' ? 'bg-white shadow' : 'text-stone-600'}`}>
            Enroll New
          </button>
        </div>
      </div>
      
      {activeSubTab === 'view' && (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {classroom.students && classroom.students.length > 0 ? (
            classroom.students.map((student) => (
              <div key={student._id} className="p-3 bg-stone-50 rounded-md flex justify-between items-center border border-stone-200">
                <span className="font-medium text-stone-800">{student.name}</span>
                <span className="text-sm text-stone-500">{student.email}</span>
              </div>
            ))
          ) : (
            <p className="text-stone-500">No students are enrolled in this class yet.</p>
          )}
        </div>
      )}

      {activeSubTab === 'enroll' && (
        <form onSubmit={enrollHandler} className="flex flex-col sm:flex-row sm:space-x-2">
          <input type="email" placeholder="Enter student email to enroll" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-grow px-3 py-2 mb-2 sm:mb-0 border border-stone-300 rounded-md" required />
          <button type="submit" disabled={isLoading} className="px-4 py-2 font-semibold text-white bg-amber-500 rounded-md hover:bg-amber-600 disabled:bg-stone-400">
            {isLoading ? 'Enrolling...' : 'Enroll Student'}
          </button>
        </form>
      )}
    </div>
  );
};

export default StudentManagementSection;