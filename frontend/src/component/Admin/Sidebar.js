import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Users, 
  StarHalf,
  ChevronDown,
  ChevronRight,
  Plus,
  Boxes
} from 'lucide-react';

const Sidebar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <div className="min-h-screen w-64 bg-white border-r shadow-sm p-4 space-y-4">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2 px-4 py-2">
        <span className="text-xl font-bold">Admin Panel</span>
      </Link>

      {/* Navigation Links */}
      <nav className="space-y-2">
        {/* Dashboard */}
        <Link 
          to="/admin/dashboard"
          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>

        {/* Products Dropdown */}
        <div>
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5" />
              <span>Products</span>
            </div>
            {isProductsOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {isProductsOpen && (
            <div className="ml-6 mt-2 space-y-2">
              <Link 
                to="/admin/products"
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Boxes className="h-4 w-4" />
                <span>All Products</span>
              </Link>
              <Link 
                to="/admin/product"
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create Product</span>
              </Link>
            </div>
          )}
        </div>

        {/* Orders */}
        <Link 
          to="/admin/orders"
          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ClipboardList className="h-5 w-5" />
          <span>Orders</span>
        </Link>

        {/* Users */}
        <Link 
          to="/admin/users"
          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Users className="h-5 w-5" />
          <span>Users</span>
        </Link>

        {/* Reviews */}
        <Link 
          to="/admin/reviews"
          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <StarHalf className="h-5 w-5" />
          <span>Reviews</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;