import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, clearErrors, updateOrder } from "../../actions/orderAction";
import { toast } from "react-toastify";
import { UPDATE_ORDERS_RESET } from "../../constants/orderConstatnts";

const ProcessOrder = () => {
  const { order, error } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = window.location.pathname;
  const orderId = location.split("/").pop();

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(orderId, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Order status updated successfully");
      dispatch({ type: UPDATE_ORDERS_RESET });
      navigate("/admin/orders");
    }

    dispatch(getOrderDetails(orderId));
  }, [dispatch, error, orderId, isUpdated, updateError, navigate]);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <div className="w-full md:w-1/4 bg-white shadow-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
        <Link to="/admin/orders" className="text-blue-500 hover:underline">
          Back to Orders
        </Link>
      </div>

      <div className="w-full md:w-3/4 p-6">
        {order && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-xl font-semibold mb-4">Process Order</h1>

            <div className="mb-6">
              <h2 className="text-lg font-medium">Shipping Info</h2>
              <p className="text-gray-700">Name: {order.user?.name}</p>
              <p className="text-gray-700">Phone: {order.shippingInfo?.phoneNo}</p>
              <p className="text-gray-700">
                Address: {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium">Payment</h2>
              <p
                className={`font-bold ${
                  order.paymentInfo?.status === "succeeded" ? "text-green-600" : "text-red-600"
                }`}
              >
                {order.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}
              </p>
              <p className="text-gray-700">Amount: ₹{order.totalPrice}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium">Order Status</h2>
              <p
                className={`font-bold ${
                  order.orderStatus === "Delivered" ? "text-green-600" : "text-red-600"
                }`}
              >
                {order.orderStatus}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium">Your Cart Items</h2>
              <div>
                {order.orderItems?.map((item) => (
                  <div key={item.product} className="flex items-center mb-4">
                    <img src={item.image} alt="Product" className="w-16 h-16 mr-4" />
                    <Link to={`/product/${item.product}`} className="text-blue-500 hover:underline">
                      {item.name}
                    </Link>
                    <span className="ml-auto">
                      {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {order.orderStatus !== "Delivered" && (
              <form onSubmit={updateOrderSubmitHandler} className="space-y-4">
                <div className="flex items-center">
                  <label className="mr-4 font-medium">Update Status:</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Choose Status</option>
                    {order.orderStatus === "Processing" && <option value="Shipped">Shipped</option>}
                    {order.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                  disabled={!status}
                >
                  Process
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessOrder;
