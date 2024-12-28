import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';

const Profile = () => {
  const { user, isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <MetaData title={`${user.name}'s Profile`} />
      
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Avatar and Edit Button */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
              <img 
                src={user.avatar?.url || '/api/placeholder/200/200'} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <Link 
              to="/me/update"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </Link>
          </div>

          {/* Right Column - User Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
              <p className="text-lg text-gray-900">{user.name}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Email</h4>
              <p className="text-lg text-gray-900">{user.email}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Joined On</h4>
              <p className="text-lg text-gray-900">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                to="/orders"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-center hover:bg-gray-200 transition-colors"
              >
                My Orders
              </Link>
              <Link 
                to="/password/update"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-center hover:bg-gray-200 transition-colors"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;