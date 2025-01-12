// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({isAdmin}) => {
//   const { loading, isAuthenticated ,user} = useSelector(state => state.user);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   if(isAdmin === true && user.role !== "admin"){
//     return <Navigate to="/login"/>
//   }

//   return isAuthenticated !== false? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { loadUser } from '../../actions/userActions'; // Adjust path as needed

const ProtectedRoute = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    // If we're not authenticated and not loading, try to load user
    if (!isAuthenticated && !loading) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated, loading]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Check for authentication and admin status
  if (!isAuthenticated) {
    // Redirect to login while preserving the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check admin access if required
  if (isAdmin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;