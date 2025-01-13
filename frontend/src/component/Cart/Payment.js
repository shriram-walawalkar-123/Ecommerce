import React, { Fragment, useEffect, useRef } from 'react';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import MetaData from '../layout/MetaData';
import CheckOutSteps from './CheckOutSteps';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '../../actions/orderAction';
import axios from "axios";
import { CreditCard, Calendar, Lock } from "lucide-react";
import { baseURL } from '../../config/config';

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      payBtn.current.disabled = true;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true  // Add this
      };

      const { data } = await axios.post(
        `${baseURL}/api/v1/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          alert("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckOutSteps activeStep={2} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-6 sm:py-12">
        <form
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
          onSubmit={(e) => submitHandler(e)}
        >
          <Typography className="text-2xl font-bold text-center mb-6">
            Card Information
          </Typography>
          <div className="flex items-center border-b-2 border-gray-200 py-2 mb-4">
            <CreditCard className="text-gray-400 mr-3" size={20} />
            <CardNumberElement className="w-full p-2" />
          </div>
          <div className="flex items-center border-b-2 border-gray-200 py-2 mb-4">
            <Calendar className="text-gray-400 mr-3" size={20} />
            <CardExpiryElement className="w-full p-2" />
          </div>
          <div className="flex items-center border-b-2 border-gray-200 py-2 mb-6">
            <Lock className="text-gray-400 mr-3" size={20} />
            <CardCvcElement className="w-full p-2" />
          </div>

          <button
            type="submit"
            ref={payBtn}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Pay ₹{orderInfo && orderInfo.totalPrice}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
