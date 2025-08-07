import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={product.images[0].url}
        alt={product.name}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">
        <p className="text-lg font-semibold truncate">{product.name}</p>
        <p className="text-gray-500 text-sm">({product.numOfReviews} Reviews)</p>
        <span className="text-blue-600 font-bold text-xl">₹{product.price}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
