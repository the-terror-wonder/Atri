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

const ClassroomPage = () => {
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: classroomId } = useParams();
  const { userInfo } = useContext(AuthContext); // Get user info from context

  const fetchClassroom = async () => {
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

  const handleStudentEnrolled = (updatedClassroom) => {
    setClassroom(updatedClassroom);
  };

  if (loading) {
    return <div>Loading classroom...</div>;
  }

  if (!classroom) {
    return <div>Classroom not found.</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{classroom.name}</h1>
      
      {userInfo && userInfo.role === 'faculty' ? (
        <>
          <p className="text-gray-600 mb-8">Manage your assignments, quizzes, and students for this class.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AssignmentSection classroomId={classroomId} />
            <QuizSection classroomId={classroomId} />
            <StudentManagementSection classroom={classroom} onStudentEnrolled={handleStudentEnrolled} />
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-600 mb-8">View your assignments and quizzes for this class.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StudentAssignmentList classroomId={classroomId} />
            <StudentQuizList classroomId={classroomId} />
          </div>
        </>
      )}
    </div>
  );
};

export default ClassroomPage;