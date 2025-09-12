import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

// Import all section components
import AssignmentSection from '../components/AssignmentSection';
import QuizSection from '../components/QuizSection';
import StudentManagementSection from '../components/StudentManagementSection';
import StudentAssignmentList from '../components/StudentAssignmentList';
import StudentQuizList from '../components/StudentQuizList';
import NoticeSection from '../components/NoticeSection';

const ClassroomPage = () => {
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('notices'); // State to manage active tab
  const { id: classroomId } = useParams();
  const { userInfo } = useContext(AuthContext);

  const fetchClassroom = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/api/classrooms/${classroomId}`);
      setClassroom(data);
    } catch (error) {
      toast.error('Could not fetch classroom details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassroom();
  }, [classroomId]);

  if (loading) {
    return <div className="p-8">Loading classroom...</div>;
  }

  if (!classroom) {
    return <div className="p-8">Classroom not found.</div>;
  }
  
  // Helper to create styled tab buttons
  const TabButton = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
        activeTab === tabName
          ? 'bg-amber-500 text-white shadow-md'
          : 'bg-white text-stone-600 hover:bg-stone-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-stone-800 mb-2">{classroom.name}</h1>
      <p className="text-lg text-stone-600 mb-8">
        {userInfo.role === 'faculty' ? 'Select a tab to manage this classroom.' : 'Select a tab to view course materials.'}
      </p>

      {/* Tab/Tile Navigation */}
      <div className="flex space-x-2 sm:space-x-4 border-b border-stone-200 pb-4 mb-8">
        <TabButton tabName="notices" label="📢 Announcements" />
        {userInfo.role === 'faculty' ? (
          <>
            <TabButton tabName="students" label="👥 Students" />
            <TabButton tabName="assignments" label="📝 Assignments" />
            <TabButton tabName="quizzes" label="❓ Quizzes" />
          </>
        ) : (
          <>
            <TabButton tabName="assignments" label="📝 Assignments" />
            <TabButton tabName="quizzes" label="❓ Quizzes" />
          </>
        )}
      </div>

      {/* Conditionally Rendered Content */}
      <div className="mt-8">
        {activeTab === 'notices' && <NoticeSection classroomId={classroomId} />}
        
        {/* Faculty Views */}
        {userInfo.role === 'faculty' && activeTab === 'students' && (
          <StudentManagementSection classroom={classroom} onStudentEnrolled={fetchClassroom} />
        )}
        {userInfo.role === 'faculty' && activeTab === 'assignments' && (
          <AssignmentSection classroomId={classroomId} />
        )}
        {userInfo.role === 'faculty' && activeTab === 'quizzes' && (
          <QuizSection classroomId={classroomId} />
        )}

        {/* Student Views */}
        {userInfo.role === 'student' && activeTab === 'assignments' && (
          <StudentAssignmentList classroomId={classroomId} />
        )}
        {userInfo.role === 'student' && activeTab === 'quizzes' && (
          <StudentQuizList classroomId={classroomId} />
        )}
      </div>
    </div>
  );
};

export default ClassroomPage;