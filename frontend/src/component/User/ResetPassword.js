import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, resetPassword } from '../../actions/userActions';
import { FiKey, FiShield } from 'react-icons/fi';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { error, success, loading } = useSelector((state) => state.forgotPassword);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState('');

  useEffect(() => {
    if (error) {
      setShowError(error);
      dispatch(clearErrors());
    }

    if (success) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [dispatch, error, navigate, success]);

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setShowError("Passwords don't match!");
      return;
    }

    if (password.length < 8) {
      setShowError("Password must be at least 8 characters long");
      return;
    }

    const myForm = new FormData();
    myForm.append('password', password);
    myForm.append('confirmPassword', confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {showError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {showError}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Password updated successfully! Redirecting to login...
          </div>
        )}

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Password</h2>
        <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
          <div className="relative">
            <FiKey className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              minLength={8}
            />
          </div>

          <div className="relative">
            <FiShield className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;