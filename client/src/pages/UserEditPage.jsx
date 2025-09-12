import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const UserEditPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  const { id: userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get(`/api/users/${userId}`);
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch user data.');
      }
    };
    fetchUser();
  }, [userId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/users/${userId}`, { name, email, role });
      toast.success('User updated successfully!');
      navigate('/dashboard'); // Go back to the user list
    } catch (error) {
      toast.error('Failed to update user.');
    }
  };

  if (loading) return <div>Loading user...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
        &larr; Go Back
      </Link>
      <div className="mt-4 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Edit User</h1>
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Form fields for name, email, and role */}
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md" />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md">
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;