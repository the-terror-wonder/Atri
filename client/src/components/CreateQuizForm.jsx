import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const CreateQuizForm = ({ classroomId, onQuizCreated }) => {
  const [title, setTitle] = useState('');
  const [availableFrom, setAvailableFrom] = useState(''); 
  const [availableUntil, setAvailableUntil] = useState(''); 
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);

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
      // Send the new date fields in the API call
      await API.post(`/api/classrooms/${classroomId}/quizzes`, { 
        title, 
        questions, 
        availableFrom, 
        availableUntil 
      });
      toast.success('Quiz created!');
      onQuizCreated(); // Notify parent to switch tabs
    } catch (error) {
      toast.error('Failed to create quiz.');
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-stone-700">Quiz Title</label>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700">Available From</label>
          <input
            type="datetime-local"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Available Until</label>
          <input
            type="datetime-local"
            value={availableUntil}
            onChange={(e) => setAvailableUntil(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-md"
            required
          />
        </div>
      </div>

      {/* Dynamic form for questions */}
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
            {questions.length > 1 && (
              <button type="button" onClick={() => removeQuestion(qIndex)} className="text-xs text-red-600 hover:text-red-800">
                Remove Question
              </button>
            )}
        </div>
      ))}
      <button type="button" onClick={addQuestion} className="w-full px-4 py-2 text-sm font-semibold text-sky-600 border border-sky-600 rounded-md hover:bg-sky-50">
        Add Another Question
      </button>
      <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-amber-500 rounded-md hover:bg-amber-600">
        Post Quiz
      </button>
    </form>
  );
};

export default CreateQuizForm;