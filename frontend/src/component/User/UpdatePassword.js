import React, { useEffect, useState } from 'react';
import { updatePassword } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { FiLock, FiKey, FiShield } from 'react-icons/fi';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isUpdated } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (isUpdated) {
      navigate('/account');
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, navigate, isUpdated]);

  const handleUpdatePasswordSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('oldPassword', oldPassword);
    myForm.append('newPassword', newPassword);
    myForm.append('confirmPassword', confirmPassword);

    dispatch(updatePassword(myForm));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Password</h2>
        <form onSubmit={handleUpdatePasswordSubmit} className="space-y-4">

          <div className="relative">
            <FiKey className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg shadow-md transition duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
