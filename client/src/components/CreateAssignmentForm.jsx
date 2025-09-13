import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const CreateAssignmentForm = ({ classroomId, onAssignmentCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(''); 

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !description ||!dueDate) {
      return toast.error('Please fill out all fields.');
    }
    try {
      await API.post(`/api/classrooms/${classroomId}/assignments`, { title, description,dueDate });
      setTitle('');
      setDescription('');
      setDueDate('');
      toast.success('Assignment created!');
      onAssignmentCreated(); // Notify the parent to refresh or switch tab
    } catch (error) {
      toast.error('Failed to create assignment.');
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-stone-700">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-stone-700">Description</label>
        <textarea
          id="description"
          placeholder="Assignment Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-md"
          rows="4"
        ></textarea>
      </div>
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-stone-700">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-md"
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-amber-500 rounded-md hover:bg-amber-600">
        Post Assignment
      </button>
    </form>
  );
};

export default CreateAssignmentForm;