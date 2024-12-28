import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({isAdmin}) => {
  const { loading, isAuthenticated ,user} = useSelector(state => state.user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if(isAdmin === true && user.role !== "admin"){
    return <Navigate to="/login"/>
  }

  return isAuthenticated !== false? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;