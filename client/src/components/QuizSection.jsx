import React, { useState } from 'react';
import QuizList from './QuizList';
import CreateQuizForm from './CreateQuizForm';

const QuizSection = ({ classroomId }) => {
  const [activeSubTab, setActiveSubTab] = useState('view');
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableUntil, setAvailableUntil] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/api/classrooms/${classroomId}/quizzes`, { title, questions, availableFrom, availableUntil });
      setQuizzes([newQuiz, ...quizzes]);
      setTitle('');
      setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
      setAvailableFrom(''); 
      setAvailableUntil(''); 
      toast.success('Quiz created!');
    } catch (error) {
      toast.error('Failed to create quiz.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-stone-700">❓ Quizzes</h2>
        <div className="flex space-x-2 p-1 bg-stone-100 rounded-lg">
          <button 
            onClick={() => setActiveSubTab('view')}
            className={`px-3 py-1 text-sm font-semibold rounded-md ${activeSubTab === 'view' ? 'bg-white shadow' : 'text-stone-600'}`}
          >
            View All
          </button>
          <button 
            onClick={() => setActiveSubTab('create')}
            className={`px-3 py-1 text-sm font-semibold rounded-md ${activeSubTab === 'create' ? 'bg-white shadow' : 'text-stone-600'}`}
          >
            Create New
          </button>
        </div>
      </div>
      <div>
        {activeSubTab === 'view' && <QuizList classroomId={classroomId} />}
        {activeSubTab === 'create' && (
          <CreateQuizForm 
            classroomId={classroomId} 
            onQuizCreated={() => setActiveSubTab('view')} 
          />
        )}
      </div>
    </div>
  );
};

export default QuizSection;