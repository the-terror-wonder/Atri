import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {
  return (
    <>
      <header>
        {/* We will add a Navbar component here later */}
        <h1>Atri Nav</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;