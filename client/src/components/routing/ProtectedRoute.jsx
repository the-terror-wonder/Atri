import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useContext(AuthContext);
  return userInfo ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;