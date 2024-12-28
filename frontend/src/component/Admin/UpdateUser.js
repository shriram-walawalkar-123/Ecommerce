import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaUserShield } from "react-icons/fa";
import { clearErrors, getUserDetails, updateUser } from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {error, user } = useSelector(state => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = window.location.pathname.split("/").pop();
//   console.log("userId is : ",userId);

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setRole(user?.role || "");
    }

    if (error || updateError) {
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
    
  }, [dispatch, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(userId, formData));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Update User</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
        onSubmit={updateUserSubmitHandler}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <div className="flex items-center border border-gray-300 rounded px-3">
            <FaUser className="text-gray-500 mr-2" />
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-2 px-1 text-gray-700 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded px-3">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-1 text-gray-700 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <div className="flex items-center border border-gray-300 rounded px-3">
            <FaUserShield className="text-gray-500 mr-2" />
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full py-2 px-1 text-gray-700 focus:outline-none"
              required
            >
              <option value="">Choose Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-bold rounded ${
            updateLoading || role === ""
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          disabled={updateLoading || role === ""}
        >
          {updateLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
