import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const QuizTakingPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const { id: quizId } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await API.get(`/api/quizzes/${quizId}`);
        setQuiz(data);
      } catch (error) {
        toast.error('Could not fetch quiz.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // For now, we'll just log the answers.
    // In the next step, we will submit this to the backend.
    console.log('Final Answers:', answers);
    toast.info('Quiz submission logic will be implemented next!');
  };

  if (loading) return <div>Loading Quiz...</div>;
  if (!quiz) return <div>Quiz not found.</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{quiz.title}</h1>
      <p className="text-gray-600 mb-8">Answer all questions to the best of your ability.</p>

      <form onSubmit={submitHandler}>
        {quiz.questions.map((q, index) => (
          <div key={q._id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{index + 1}. {q.questionText}</h3>
            <div className="space-y-2">
              {q.options.map((option, oIndex) => (
                <label key={oIndex} className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name={q._id}
                    value={option}
                    onChange={() => handleAnswerChange(q._id, option)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="w-full mt-4 px-6 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizTakingPage;