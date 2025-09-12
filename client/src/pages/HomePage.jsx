import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import logo from '../assets/atri_logo_only.png'; // Make sure this path is correct

const HomePage = () => {
  const { userInfo } = useContext(AuthContext);

  if (userInfo) {
    return (
      <div className="text-center py-20 px-4 bg-stone-50 min-h-[calc(100vh-80px)] flex flex-col justify-center items-center">
        <img src={logo} alt="Atri Symbol" className="w-55 h-50 mx-auto mb-8 opacity-90" /> {/* Added logo here */}
        <h1 className="text-4xl font-bold text-stone-800 mb-4">Welcome back, {userInfo.name}</h1>
        <p className="text-lg text-stone-600 mb-8">You are logged in. Go to your dashboard to continue.</p>
        <Link 
          to="/dashboard" 
          className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-600 text-lg transition-colors shadow-sm"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center py-20 px-4 bg-stone-50 min-h-[calc(100vh-80px)] flex flex-col justify-center items-center">
      <img src={logo} alt="Atri Symbol" className="w-55 h-50 mx-auto mb-6 opacity-90" /> {/* Central logo */}
      <h1 className="text-5xl md:text-6xl font-bold text-stone-800 mb-4">
        Welcome to Atri
      </h1>
      <p className="text-xl md:text-2xl text-stone-600 mb-10 max-w-2xl mx-auto">
        Your clear path to knowledge. Join a classroom, master your subjects, and grow with confidence.
      </p>
      <div className="space-x-4">
        <Link 
          to="/register" 
          className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-600 text-lg transition-colors shadow-sm"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;