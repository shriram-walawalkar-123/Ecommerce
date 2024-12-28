import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-6">Thank you for shopping with us. Your order has been placed successfully.</p>
      <Link
        to="/orders"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
      >
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
