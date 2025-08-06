import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    if (!allowedRoles.includes(decoded.role.toLowerCase())) {
      return <Navigate to="/" />;
    }
    return children;
  } catch (err) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
