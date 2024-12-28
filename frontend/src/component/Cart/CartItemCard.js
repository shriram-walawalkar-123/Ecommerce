// CartItemCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartItemCard = ({ item, deleteCartItems, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center p-6 border-b border-gray-200">

      <div className="flex items-center">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md mr-4"
        />
        <div>
          <Link 
            to={`/product/${item.product}`}
            className="text-lg font-medium text-gray-800 hover:text-blue-600"
          >
            {item.name}
          </Link>
          <button 
            onClick={() => deleteCartItems(item.product)}
            className="text-red-500 hover:text-red-700 flex items-center mt-2 text-sm"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Remove
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600">Rs {item.price}</p>
      </div>
      
      <div className="flex items-center justify-center">
        <button
          onClick={() => decreaseQuantity(item.product, item.quantity)}
          className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          value={item.quantity}
          readOnly
          className="w-12 h-8 mx-2 text-center border rounded"
        />
        <button
          onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
          className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="text-right">
        <p className="font-medium text-lg">Rs {item.price * item.quantity}</p>
      </div>
    </div>
  );
};

export default CartItemCard;