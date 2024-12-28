import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../actions/userActions';
import { getOrderDetails } from '../../actions/orderAction';
import { Link, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { Typography } from '@mui/material';
import { FaShippingFast, FaMapMarkerAlt,  FaMoneyCheckAlt } from 'react-icons/fa';

const OrderDetails = () => {
  const { order = {}, error } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  const {
    shippingInfo = {},
    orderItems = [],
    paymentInfo = {},
    user = {},
    totalPrice,
    orderStatus,
  } = order;

  return (
    <Fragment>
      <MetaData title="Order Details" />
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <div className="mb-6">
          <Typography variant="h5" className="text-2xl font-bold text-gray-700">
            Order #{id}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Info */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center mb-4">
              <FaShippingFast className="text-blue-500 text-xl mr-2" />
              <Typography variant="h6" className="text-xl font-semibold text-gray-600">
                Shipping Info
              </Typography>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {shippingInfo.phoneNo}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong>{' '}
                {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}`}
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center mb-4">
              <FaMoneyCheckAlt className="text-green-500 text-xl mr-2" />
              <Typography variant="h6" className="text-xl font-semibold text-gray-600">
                Payment
              </Typography>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Status:</strong>{' '}
                <span
                  className={
                    paymentInfo.status === 'succeeded'
                      ? 'text-green-500 font-semibold'
                      : 'text-red-500 font-semibold'
                  }
                >
                  {paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Amount:</strong> ₹{totalPrice}
              </p>
            </div>
          </div>

          {/* Order Status */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-purple-500 text-xl mr-2" />
              <Typography variant="h6" className="text-xl font-semibold text-gray-600">
                Order Status
              </Typography>
            </div>
            <p
              className={
                orderStatus?.toLowerCase() === 'delivered'
                  ? 'text-green-500 font-bold'
                  : 'text-red-500 font-bold'
              }
            >
              {orderStatus}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-8">
          <Typography variant="h6" className="text-xl font-semibold text-gray-600 mb-4">
            Order Items
          </Typography>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div
                key={item.product}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <Link
                    to={`/product/${item.product}`}
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-600">
                    {item.quantity} x ₹{item.price} ={' '}
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
