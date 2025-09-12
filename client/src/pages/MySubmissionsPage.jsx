import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const MySubmissionsPage = () => {
  const [quizSubmissions, setQuizSubmissions] = useState([]);
  const [assignmentSubmissions, setAssignmentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllSubmissions = async () => {
      try {
        // Fetch both sets of data in parallel for efficiency
        const [quizRes, assignmentRes] = await Promise.all([
          API.get('/api/submissions/my-quizzes'),
          API.get('/api/submissions/my-assignments')
        ]);
        setQuizSubmissions(quizRes.data);
        setAssignmentSubmissions(assignmentRes.data);
      } catch (error) {
        toast.error('Could not fetch your submissions.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllSubmissions();
  }, []);

  if (loading) return <div>Loading your submissions...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Submissions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quiz Submissions Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Quiz Results</h2>
          {quizSubmissions.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {quizSubmissions.map((sub) => (
                <li key={sub._id} className="py-4">
                  <p className="font-semibold text-indigo-600">{sub.quiz?.title || 'Quiz'}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500">
                      Submitted: {new Date(sub.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      {sub.score} / {sub.totalQuestions}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have not submitted any quizzes yet.</p>
          )}
        </div>

        {/* Assignment Submissions Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Assignment Grades</h2>
          {assignmentSubmissions.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {assignmentSubmissions.map((sub) => (
                <li key={sub._id} className="py-4">
                  <p className="font-semibold text-indigo-600">{sub.assignment?.title || 'Assignment'}</p>
                   <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500">
                      Submitted: {new Date(sub.createdAt).toLocaleDateString()}
                    </p>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${sub.grade ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {sub.grade ? `Grade: ${sub.grade}` : 'Not Graded Yet'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have not submitted any assignments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySubmissionsPage;