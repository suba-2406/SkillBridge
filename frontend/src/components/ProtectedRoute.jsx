import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { userData } = useUser();
  const location = useLocation();

  if (!userData.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole && userData.role !== allowedRole) {
    // If logged in but wrong role, redirect to appropriate home
    return userData.role === 'student' 
      ? <Navigate to="/dashboard" replace /> 
      : <Navigate to="/company-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
