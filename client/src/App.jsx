import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;