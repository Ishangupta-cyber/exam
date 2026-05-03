import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, adminOnly }) {
  // TODO: Replace with actual auth context check
  const isAuthenticated = true;
  const isAdmin = false; 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
