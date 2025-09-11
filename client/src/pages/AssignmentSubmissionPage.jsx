import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const AssignmentSubmissionPage = () => {
  const [submissionContent, setSubmissionContent] = useState('');
  const { id: assignmentId } = useParams();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/api/assignments/${assignmentId}/submit`, { submissionContent });
      toast.success('Assignment submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit assignment.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Submit Assignment</h1>
      <form onSubmit={submitHandler} className="p-6 bg-white rounded-lg shadow-md">
        <label htmlFor="submission" className="block text-lg font-medium mb-2">
          Your Submission
        </label>
        <textarea
          id="submission"
          rows="10"
          value={submissionContent}
          onChange={(e) => setSubmissionContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Type your submission here..."
          required
        ></textarea>
        <button type="submit" className="w-full mt-4 px-6 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AssignmentSubmissionPage;