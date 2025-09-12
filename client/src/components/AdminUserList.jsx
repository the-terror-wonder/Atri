import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get('/api/users');
        setUsers(data);
      } catch (error) {
        toast.error('Could not fetch users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const deleteHandler = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/api/users/${userId}`);
        toast.success('User deleted successfully');
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user.');
      }
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-stone-200">
        <thead className="bg-stone-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Email</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Role</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-stone-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.role === 'admin' ? 'bg-red-100 text-red-800' :
                  user.role === 'faculty' ? 'bg-sky-100 text-sky-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link to={`/admin/user/${user._id}/edit`} className="text-amber-600 hover:text-amber-900">
                  Edit
                </Link>
                <button 
                  onClick={() => deleteHandler(user._id)}
                  className="text-red-600 hover:text-red-900 ml-4"
                >
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

export default AdminUserList;