import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function AdminProtectedRoute({ children }) {
  // Get the user from the user context
  const user = useContext(UserContext);
  
  // Check if user is authenticated and has admin role
  const isAdmin = user?.authorities?.some(auth => auth.name === 'ROLE_ADMIN');
  
  // If there's an authenticated user with admin role, continue to child route
  if (user && isAdmin) {
    return children;
  }

  // Otherwise, redirect to home page
  return <Navigate to="/" />;
}