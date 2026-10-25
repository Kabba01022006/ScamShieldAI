import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Route protection wrapper component.
 * Verifies authentication status via AuthContext.
 * If user is not authenticated, redirects to /login while preserving
 * the intended destination via `state: { from: location }` so the user
 * is returned to their original requested route after logging in.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
