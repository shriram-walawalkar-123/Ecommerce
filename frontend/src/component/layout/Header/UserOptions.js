import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ClipboardList, LayoutDashboard } from 'lucide-react';
import { logOut } from '../../../actions/userActions';
import { toast } from 'react-toastify';

const UserOptions = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = [
    {
      icon: <ClipboardList className="w-5 h-5" />,
      name: "Orders",
      func: () => navigate('/orders'),
    },
    {
      icon: <User className="w-5 h-5" />,
      name: "Profile",
      func: () => navigate('/account'),
    },
    {
      icon: <LogOut className="w-5 h-5" />,
      name: "Logout",
      func: () => {
        dispatch(logOut());
        toast.success('Logout successful');
      },
    },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <LayoutDashboard className="w-5 h-5" />,
      name: "Dashboard",
      func: () => navigate('/admin/dashboard'),
    });
  }

  return (
    <div className="relative print:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-40 flex items-center justify-center focus:outline-none"
        aria-label="User menu"
      >
        <img
          src={user?.avatar?.url || "/logo512.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-colors object-cover"
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 fixed top-16 right-4">
            <div className="py-1">
              {options.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    item.func();
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
                >
                  <span className="mr-3 text-gray-500">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserOptions;