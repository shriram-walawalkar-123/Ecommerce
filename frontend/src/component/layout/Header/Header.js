import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo512.png";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../../actions/userActions";
import { ShoppingCart} from 'lucide-react';

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  
  const {cartItems} = useSelector(state => state.cart);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/products/${searchInput}`);
    } else {
      navigate("/products");
    }
  };

  const handleLogout = () => {
    dispatch(logOut()); 
    navigate("/login"); 
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="text-lg font-bold">E-Commerce</span>
        </Link>

        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/products" className="hover:text-blue-400">
            Products
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-gray-700 rounded-full px-4 py-1"
          >
            <input
              type="text"
              placeholder="Search a Product..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-transparent outline-none text-sm text-white placeholder-gray-400"
            />
            <button type="submit" className="text-blue-400 hover:text-blue-500">
              <i className="fas fa-search"></i>
            </button>
          </form>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="hidden md:block text-sm">Hi, {user?.name}</span>
                <Link to="/cart" className="relative hover:text-blue-400">
                  <ShoppingCart className="w-6 h-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
