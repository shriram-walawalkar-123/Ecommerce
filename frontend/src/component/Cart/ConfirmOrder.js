import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector } from "react-redux";
import { Link, User, MapPin, Phone, ShoppingCart, CreditCard } from "lucide-react";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceesToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckOutSteps activeStep={1} />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
          {/* Shipping Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <User className="w-5 h-5 mr-2" /> Shipping Info
            </h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> <span>{address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" /> <span>{shippingInfo.phoneNo}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" /> <span>{user.name}</span>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <ShoppingCart className="w-5 h-5 mr-2" /> Your Cart Items
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt="Product"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <Link
                    to={`/product/${item.product}`}
                    className="text-blue-600 hover:underline flex-1"
                  >
                    {item.name}
                  </Link>
                  <span className="text-gray-800">
                    {item.quantity} x ₹{item.price} = <b>₹{item.quantity * item.price}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <CreditCard className="w-5 h-5 mr-2" /> Order Summary
            </h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charges:</span>
                <span>₹{shippingCharges}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%):</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Total:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={proceesToPayment}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
