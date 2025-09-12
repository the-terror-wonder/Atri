import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const logoutHandler = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo / Brand Name */}
          <Link to="/" className="text-2xl font-bold tracking-wider">
            Atri 🌿
          </Link>

          {/* Hamburger Menu Button (visible on small screens) */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
          
          {/* Desktop Menu (visible on medium screens and up) */}
          <div className="hidden md:flex items-center space-x-6">
            {userInfo ? (
              <>
                <Link to="/dashboard" className="hover:text-indigo-400">Dashboard</Link>
                {userInfo.role === 'student' && (
                  <Link to="/my-submissions" className="hover:text-indigo-400">My Submissions</Link>
                )}
                <span className="font-semibold text-gray-300">Hi, {userInfo.name}</span>
                <button
                  onClick={logoutHandler}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-indigo-400">Sign In</Link>
                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2">
          {userInfo ? (
            <>
              <Link to="/dashboard" className="block hover:text-indigo-400">Dashboard</Link>
              {userInfo.role === 'student' && (
                <Link to="/my-submissions" className="block hover:text-indigo-400">My Submissions</Link>
              )}
              <button
                onClick={logoutHandler}
                className="w-full text-left mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-indigo-400">Sign In</Link>
              <Link to="/register" className="block bg-indigo-600 hover:bg-indigo-700 mt-2 px-4 py-2 rounded-md text-sm font-medium">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;