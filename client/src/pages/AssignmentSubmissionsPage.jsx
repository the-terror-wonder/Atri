import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const AssignmentSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState('');
  const { id: assignmentId } = useParams();

  const fetchSubmissions = async () => {
    try {
      const { data } = await API.get(`/api/assignments/${assignmentId}/submissions`);
      setSubmissions(data);
    } catch (error) {
      toast.error('Could not fetch submissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [assignmentId]);

  const gradeHandler = async (submissionId) => {
    try {
      await API.put(`/api/submissions/assignment/${submissionId}/grade`, { grade });
      toast.success('Grade submitted!');
      fetchSubmissions(); // Refetch to show the updated grade
      setGrade('');
    } catch (error) {
      toast.error('Failed to submit grade.');
    }
  };

  if (loading) return <div>Loading submissions...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Assignment Submissions</h1>
      <div className="space-y-4">
        {submissions.length > 0 ? (
          submissions.map((sub) => (
            <div key={sub._id} className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg">{sub.student.name}</p>
                  <p className="text-sm text-gray-500">{sub.student.email}</p>
                </div>
                <p className="text-sm text-gray-600">
                  Submitted: {new Date(sub.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="my-4 p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
                {sub.submissionContent}
              </p>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Enter Grade (e.g., A+)"
                  onChange={(e) => setGrade(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded-md"
                />
                <button 
                  onClick={() => gradeHandler(sub._id)}
                  className="px-4 py-1 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Save Grade
                </button>
                {sub.grade && <span className="font-bold text-indigo-600">Current Grade: {sub.grade}</span>}
              </div>
            </div>
          ))
        ) : (
          <p>No submissions for this assignment yet.</p>
        )}
      </div>
    </div>
  );
};

export default AssignmentSubmissionsPage;