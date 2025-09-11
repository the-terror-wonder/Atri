import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const FacultyDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [newClassName, setNewClassName] = useState('');

  // This function will run once when the component loads
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const { data } = await API.get('/api/classrooms');
        setClassrooms(data);
      } catch (error) {
        toast.error('Could not fetch classrooms.');
      }
    };

    fetchClassrooms();
  }, []); // The empty array means this effect runs only once on mount

  const createClassroomHandler = async (e) => {
    e.preventDefault();
    if (!newClassName.trim()) {
      toast.error('Classroom name cannot be empty.');
      return;
    }

    try {
      const { data: newClassroom } = await API.post('/api/classrooms', {
        name: newClassName,
      });
      // Add the new classroom to our existing list to update the UI instantly
      setClassrooms([...classrooms, newClassroom]);
      setNewClassName(''); // Clear the input field
      toast.success('Classroom created successfully!');
    } catch (error) {
      toast.error('Failed to create classroom.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Faculty Dashboard</h1>
      
      {/* Create Classroom Form */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create a New Classroom</h2>
        <form onSubmit={createClassroomHandler} className="flex space-x-4">
          <input
            type="text"
            placeholder="e.g., Grade 10 Physics"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Create
          </button>
        </form>
      </div>

      {/* List of Classrooms */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Classrooms</h2>
        <div className="space-y-4">
          {classrooms.length > 0 ? (
            classrooms.map((classroom) => (
              <div key={classroom._id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
                <h3 className="text-xl font-medium">{classroom.name}</h3>
                <span className="text-sm text-gray-500">
                  {classroom.students.length} Student(s)
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">You have not created any classrooms yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;