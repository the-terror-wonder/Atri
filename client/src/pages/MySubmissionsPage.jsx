import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const MySubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data } = await API.get('/api/submissions/my-quizzes');
        setSubmissions(data);
      } catch (error) {
        toast.error('Could not fetch your submissions.');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  if (loading) return <div>Loading your submissions...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Quiz Submissions</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {submissions.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {submissions.map((sub) => (
              <li key={sub._id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-indigo-600">{sub.quiz.title}</p>
                  <p className="text-sm text-gray-500">
                    Submitted on: {new Date(sub.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-xl font-bold text-gray-800">
                  Score: {sub.score} / {sub.totalQuestions}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not submitted any quizzes yet.</p>
        )}
      </div>
    </div>
  );
};

export default MySubmissionsPage;