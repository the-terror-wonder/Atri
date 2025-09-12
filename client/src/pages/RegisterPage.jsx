import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import API from '../services/api';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/api/users', { name, email, password, role });
      login(data);
      toast.success('Registration successful! Welcome.');
      navigate('/dashboard'); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-stone-50 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-stone-800">Create Your Account</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700">Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 mt-1 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email Address</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mt-1 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400" />
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-stone-700">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400" />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-stone-700">I am a...</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 mt-1 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white">
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-amber-500 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              Create Account
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-stone-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-amber-600 hover:text-amber-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;