import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const AdminClassroomList = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const { data } = await API.get('/api/classrooms/all');
        setClassrooms(data);
      } catch (error) {
        toast.error('Could not fetch classrooms.');
      } finally {
        setLoading(false);
      }
    };
    fetchClassrooms();
  }, []);

  const deleteHandler = async (classroomId) => {
    if (window.confirm('Are you sure you want to delete this classroom and all its data?')) {
      try {
        await API.delete(`/api/classrooms/${classroomId}`);
        toast.success('Classroom deleted successfully');
        setClassrooms(classrooms.filter((c) => c._id !== classroomId));
      } catch (error) {
        toast.error('Failed to delete classroom.');
      }
    }
  };

  if (loading) return <div>Loading classrooms...</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classroom Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Faculty</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {classrooms.map((c) => (
            <tr key={c._id}>
              <td className="px-6 py-4">{c.name}</td>
              <td className="px-6 py-4">{c.faculty?.name || 'N/A'} ({c.faculty?.email || 'N/A'})</td>
              <td className="px-6 py-4">
                <button onClick={() => deleteHandler(c._id)} className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminClassroomList;