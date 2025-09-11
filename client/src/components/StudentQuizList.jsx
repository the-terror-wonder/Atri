import React, { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const StudentQuizList = ({ classroomId }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await API.get(
          `/api/classrooms/${classroomId}/quizzes`
        );
        setQuizzes(data);
      } catch (error) {
        toast.error("Could not fetch quizzes.");
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
            <Link
              key={quiz._id}
              to={`/quiz/${quiz._id}`}
              className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <h4 className="font-bold text-indigo-600">{quiz.title}</h4>
              <p className="text-sm text-gray-500">
                {quiz.questions.length} questions
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">
            No quizzes have been posted for this class yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentQuizList;
