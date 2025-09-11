import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const StudentQuizList = ({ classroomId }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await API.get(`/api/classrooms/${classroomId}/quizzes`);
        setQuizzes(data);
      } catch (error) {
        toast.error('Could not fetch quizzes.');
      }
    };
    if (classroomId) {
      fetchQuizzes();
    }
  }, [classroomId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Quizzes</h2>
      <div className="space-y-4">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz._id} className="p-4 border border-gray-200 rounded-md">
              <h4 className="font-bold text-gray-800">{quiz.title}</h4>
              <p className="text-sm text-gray-500">{quiz.questions.length} questions</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No quizzes have been posted for this class yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentQuizList;