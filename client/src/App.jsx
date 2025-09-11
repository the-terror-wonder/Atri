import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;