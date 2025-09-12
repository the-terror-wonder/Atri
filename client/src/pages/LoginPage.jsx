import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import API from '../services/api'; // 👈 Make sure API is imported
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [userInfo, navigate]);

  // CORRECTED SUBMIT HANDLER
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // 1. Call the backend API to authenticate the user
      const { data } = await API.post('/api/users/login', { email, password });
      
      // 2. If successful, save the returned user data to our global context
      login(data);

      navigate('/dashboard');
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-stone-50 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-stone-800">Sign In</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 mt-1 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-stone-700">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 mt-1 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-amber-500 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-stone-600">
            New to Atri?{' '}
            <Link to="/register" className="font-medium text-amber-600 hover:text-amber-500 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;