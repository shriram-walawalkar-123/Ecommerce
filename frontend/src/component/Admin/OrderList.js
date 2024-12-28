import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDERS_RESET } from "../../constants/orderConstatnts";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    console.log("delete order id : ",id);
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDERS_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered"
          ? "text-green-500"
          : "text-red-500";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              to={`/admin/order/${params.row.id}`}
              className="text-blue-500 hover:underline"
            >
              Edit
            </Link>
  
            <button
              onClick={() => deleteOrderHandler(params.row.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </Fragment>
        );
      },
    },
  ];
  

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <div className="bg-gray-100 min-h-screen">
        <div className="flex justify-center">
          <div className="w-full lg:w-4/5 p-5">
            <h1 className="text-2xl font-bold mb-5 text-gray-800">All Orders</h1>

            <div className="bg-white shadow-md rounded-lg p-5">
              {/* DataGrid component to display orders */}
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="text-sm text-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
