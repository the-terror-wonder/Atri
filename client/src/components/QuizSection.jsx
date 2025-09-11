import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const QuizSection = ({ classroomId }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);

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

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data: newQuiz } = await API.post(`/api/classrooms/${classroomId}/quizzes`, { title, questions });
      setQuizzes([newQuiz, ...quizzes]);
      setTitle('');
      setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
      toast.success('Quiz created!');
    } catch (error) {
      toast.error('Failed to create quiz.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Quizzes</h2>
      
      <form onSubmit={submitHandler} className="mb-6 space-y-4">
        <h3 className="text-lg font-medium">Add a New Quiz</h3>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="p-4 border border-dashed border-gray-300 rounded-md space-y-2">
            <label className="block text-sm font-medium">Question {qIndex + 1}</label>
            <input
              type="text"
              placeholder="Question text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
              className="w-full px-2 py-1 border border-gray-200 rounded-md"
              required
            />
            {q.options.map((opt, oIndex) => (
              <input
                key={oIndex}
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded-md"
                required
              />
            ))}
            <input
              type="text"
              placeholder="Correct Answer (must match one option exactly)"
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
              className="w-full px-2 py-1 border border-green-300 rounded-md"
              required
            />
            <button type="button" onClick={() => removeQuestion(qIndex)} className="text-xs text-red-600 hover:text-red-800">
              Remove Question
            </button>
          </div>
        ))}
        <button type="button" onClick={addQuestion} className="w-full px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50">
          Add Another Question
        </button>
        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Post Quiz
        </button>
      </form>

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

export default QuizSection;