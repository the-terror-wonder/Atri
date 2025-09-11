import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const AssignmentSection = ({ classroomId }) => {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch assignments for this classroom when the component loads
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      return toast.error('Please fill out all fields.');
    }
    try {
      const { data: newAssignment } = await API.post(`/api/classrooms/${classroomId}/assignments`, {
        title,
        description,
      });
      // Add the new assignment to the top of our list for an instant UI update
      setAssignments([newAssignment, ...assignments]);
      setTitle('');
      setDescription('');
      toast.success('Assignment created!');
    } catch (error) {
      toast.error('Failed to create assignment.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
      
      {/* Form for creating a new assignment */}
      <form onSubmit={submitHandler} className="mb-6 space-y-3">
        <h3 className="text-lg font-medium">Add a New Assignment</h3>
        <div>
          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <textarea
            placeholder="Assignment Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Post Assignment
        </button>
      </form>

      {/* List of existing assignments */}
      <div className="space-y-4">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div key={assignment._id} className="p-4 border border-gray-200 rounded-md">
              <h4 className="font-bold text-gray-800">{assignment.title}</h4>
              <p className="text-gray-600">{assignment.description}</p>
              <p className="text-xs text-gray-400 mt-2">Posted on: {new Date(assignment.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No assignments have been posted for this class yet.</p>
        )}
      </div>
    </div>
  );
};

export default AssignmentSection;