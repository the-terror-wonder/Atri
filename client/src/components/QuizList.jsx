import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const QuizList = ({ classroomId }) => {
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
    fetchQuizzes();
  }, [classroomId]);

  return (
    <div className="space-y-4">
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz._id} className="p-4 border border-stone-200 rounded-lg">
            <h4 className="font-bold text-stone-800">{quiz.title}</h4>
            <p className="text-sm text-stone-500">{quiz.questions.length} questions</p>
          </div>
        ))
      ) : (
        <p className="text-stone-500">No quizzes have been posted for this class yet.</p>
      )}
    </div>
  );
};

export default QuizList;