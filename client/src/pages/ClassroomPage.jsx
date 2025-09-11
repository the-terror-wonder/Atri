import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import AssignmentSection from '../components/AssignmentSection';
import QuizSection from '../components/QuizSection';
import StudentManagementSection from '../components/StudentManagementSection';

const ClassroomPage = () => {
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: classroomId } = useParams(); 
  useEffect(() => {
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

    fetchClassroom();
  }, [classroomId]);

  if (loading) {
    return <div>Loading classroom...</div>;
  }

  if (!classroom) {
    return <div>Classroom not found.</div>;
  }

  const handleStudentEnrolled = (updatedClassroom) => {
    setClassroom(updatedClassroom);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{classroom.name}</h1>
      <p className="text-gray-600 mb-8">Manage your assignments, quizzes, and students for this class.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <AssignmentSection classroomId={classroomId} />

        <QuizSection classroomId={classroomId} />

        <StudentManagementSection classroom={classroom} onStudentEnrolled={handleStudentEnrolled} />
        
      </div>
    </div>
  );
};

export default ClassroomPage;