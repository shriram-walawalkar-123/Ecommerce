// Cart.js
import React from 'react';
import {useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemsFromCart } from '../../actions/cartAction';
import CartItemCard from "./CartItemCard";

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate();

    const increaseQuantity = (id, quantity, stock) => {
      const newQty = quantity + 1;
      if (stock <= quantity) return;
      dispatch(addItemToCart(id, newQty));
    };
  
    const decreaseQuantity = (id, quantity) => {
      const newQty = quantity - 1;
      if (1 >= quantity) return;
      dispatch(addItemToCart(id, newQty));
    };
  
    const deleteCartItems = (id) => {
      dispatch(removeItemsFromCart(id));
    };

    const checkOutHandler = () => {
        navigate('/shipping')
    }
  
    const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
              <div className="grid grid-cols-4 gap-4 text-gray-600">
                <div>Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Subtotal</div>
              </div>
            </div>
          </div>

          <div>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.product}
                    item={item}
                    deleteCartItems={deleteCartItems}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                  />
                ))}

                <div className="p-6 border-t border-gray-200">
                  <div className="flex justify-end items-center mb-6">
                    <span className="text-xl font-semibold mr-4">Total:</span>
                    <span className="text-xl font-bold">Rs {totalAmount}</span>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={checkOutHandler}
                      className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 text-lg font-medium"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">
                Your cart is empty
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default Cart;