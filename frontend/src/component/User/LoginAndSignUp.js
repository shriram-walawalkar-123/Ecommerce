// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login, register } from '../../actions/userActions';
// import { Link, useNavigate } from 'react-router-dom';

// const LoginAndSignUp = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('login');

//   const [loginEmail, setLoginEmail] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');

//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const [avatar, setAvatar] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const { loading, error, isAuthenticated, message } = useSelector(
//     (state) => state.user
//   );

//   const loginSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login(loginEmail, loginPassword));
//   };

//   const registerSubmit = async (e) => {
//     e.preventDefault();

//     if (!user.name || !user.email || !user.password) {
//       alert('Please fill in all fields');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', user.name);
//     formData.append('email', user.email);
//     formData.append('password', user.password);

//     if (avatar) {
//       formData.append('avatar', avatar); 
//     }

//     try {
//       dispatch(register(formData));
//       setSuccessMessage('Registration successful! Please login.');
//       setActiveTab('login'); 
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const registerDataChange = (e) => {
//     if (e.target.name === 'avatar') {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setAvatarPreview(reader.result);
//           setAvatar(e.target.files[0]);
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     } else {
//       setUser({ ...user, [e.target.name]: e.target.value });
//     }
//   };

//   useEffect(() => {
//     if (message) {
//       setSuccessMessage(message);
//     }
//     if (isAuthenticated) {
//       navigate('/'); 
//     }
//   }, [dispatch, isAuthenticated, message,navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">

//         <div className="flex mb-6">
//           <button
//             onClick={() => setActiveTab('login')}
//             className={`w-1/2 py-2 text-center ${
//               activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
//             } rounded-l-lg transition-colors`}
//           >
//             LOGIN
//           </button>
//           <button
//             onClick={() => setActiveTab('register')}
//             className={`w-1/2 py-2 text-center ${
//               activeTab === 'register' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
//             } rounded-r-lg transition-colors`}
//           >
//             REGISTER
//           </button>
//         </div>

//         {successMessage && (
//           <div
//             className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
//             role="alert"
//           >
//             {successMessage}
//           </div>
//         )}

//         {error && (
//           <div
//             className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//             role="alert"
//           >
//             {error}
//           </div>
//         )}

//         {activeTab === 'login' && (
//           <form onSubmit={loginSubmit} className="space-y-6">
//             <div>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 required
//                 value={loginEmail}
//                 onChange={(e) => setLoginEmail(e.target.value)}
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 value={loginPassword}
//                 onChange={(e) => setLoginPassword(e.target.value)}
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <Link to="/password/forgot" className="text-blue-500 hover:text-blue-700 text-sm">
//               Forgot Password?
//             </Link>

//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>
//         )}

//         {activeTab === 'register' && (
//           <form
//             onSubmit={registerSubmit}
//             encType="multipart/form-data"
//             className="space-y-6"
//           >
//             <div>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 required
//                 name="name"
//                 value={user.name}
//                 onChange={registerDataChange}
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 required
//                 name="email"
//                 value={user.email}
//                 onChange={registerDataChange}
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 name="password"
//                 value={user.password}
//                 onChange={registerDataChange}
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div className="flex items-center space-x-4">
//               <img
//                 src={avatarPreview}
//                 alt="Avatar Preview"
//                 className="w-16 h-16 rounded-full object-cover"
//               />
//               <input
//                 type="file"
//                 name="avatar"
//                 accept="image/*"
//                 onChange={registerDataChange}
//                 className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//             >
//               {loading ? 'Registering...' : 'Register'}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginAndSignUp;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, clearErrors } from '../../actions/userActions';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LoginAndSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png'); // Default avatar

  const { loading, error, isAuthenticated, message } = useSelector(
    (state) => state.user
  );

  // Reset form function
  const resetForm = () => {
    if (activeTab === 'login') {
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setUser({
        name: '',
        email: '',
        password: '',
      });
      setAvatar(null);
      setAvatarPreview('/Profile.png');
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(loginEmail, loginPassword));
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const registerSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Please fill in all required fields'
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);

    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      await dispatch(register(formData));
      setSuccessMessage('Registration successful! Please login.');
      setActiveTab('login');
      resetForm();
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(file);
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSuccessMessage('');
    dispatch(clearErrors());
    resetForm();
  };

  useEffect(() => {
    // Clear errors when component mounts or tab changes
    dispatch(clearErrors());

    // Handle successful authentication
    if (isAuthenticated) {
      const redirect = location.state?.from || '/';
      navigate(redirect);
    }

    // Clear success message after 5 seconds
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, isAuthenticated, navigate, location.state, successMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="flex mb-6">
          <button
            onClick={() => handleTabChange('login')}
            className={`w-1/2 py-2 text-center ${
              activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            } rounded-l-lg transition-colors`}
          >
            LOGIN
          </button>
          <button
            onClick={() => handleTabChange('register')}
            className={`w-1/2 py-2 text-center ${
              activeTab === 'register' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            } rounded-r-lg transition-colors`}
          >
            REGISTER
          </button>
        </div>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {activeTab === 'login' ? (
          <form onSubmit={loginSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <Link to="/password/forgot" className="text-blue-500 hover:text-blue-700 text-sm">
              Forgot Password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form
            onSubmit={registerSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            {/* Register form fields */}
            <div>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={user.name}
                onChange={registerDataChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={user.email}
                onChange={registerDataChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={user.password}
                onChange={registerDataChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-16 h-16 rounded-full object-cover"
              />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
                className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginAndSignUp;
