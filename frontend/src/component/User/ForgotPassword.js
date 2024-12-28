import React, { useEffect, useState } from 'react'
import { forgotPassword } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { message,loading,error } = useSelector((state) => state.forgotPassword);
  const [email, setEmail] = useState('');

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('email', email);

    dispatch(forgotPassword(myForm));
  };

  useEffect(()=>{
    if(message){
      window.alert(`Message is : ${message}`);
    }
  },[dispatch,message])


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Forgot Password
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form 
            onSubmit={handleForgotPasswordSubmit} 
            className="space-y-6"
          >


            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Updating...</span>
              ) : (
                <span>Update Profile</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword