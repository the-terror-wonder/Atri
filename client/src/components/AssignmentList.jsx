import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const AssignmentList = ({ classroomId }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const { data } = await API.get(`/api/classrooms/${classroomId}/assignments`);
        setAssignments(data);
      } catch (error) {
        toast.error('Could not fetch assignments.');
      }
    };
    fetchAssignments();
  }, [classroomId]);

  return (
    <div className="space-y-4">
      {assignments.length > 0 ? (
        assignments.map((assignment) => (
          <Link 
            key={assignment._id}
            to={`/assignment/${assignment._id}/submissions`}
            className="block p-4 border border-stone-200 rounded-lg hover:bg-stone-50 hover:shadow-md transition-all"
          >
            <h4 className="font-bold text-stone-800">{assignment.title}</h4>
            <p className="text-stone-600 text-sm mt-1">{assignment.description}</p>
            <p className="text-xs text-stone-400 mt-2">Posted on: {new Date(assignment.createdAt).toLocaleDateString()}</p>
          </Link>
        ))
      ) : (
        <p className="text-stone-500">No assignments have been posted for this class yet.</p>
      )}
    </div>
  );
};

export default AssignmentList;