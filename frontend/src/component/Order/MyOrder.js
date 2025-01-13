import React from 'react';
import MetaData from '../layout/MetaData';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../actions/userActions';
import { myOrders } from '../../actions/orderAction';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
    <span className="ml-2 text-lg text-gray-700">Loading...</span>
  </div>
);

const MyOrder = () => {
  const dispatch = useDispatch();
  const { loading, error, orders = [] } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  
  console.log("orders",orders);

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          {params.value === 'Delivered' ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          )}
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
      renderCell: (params) => `₹${params.value}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`} className="text-blue-500 hover:underline">
          View
        </Link>
      ),
    },
  ];

  const rows = orders.map((item) => ({
    id: item._id,
    status: item.orderStatus,
    itemsQty: item.orderItems.length,
    amount: item.totalPrice,
  }));

  React.useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <MetaData title={`${user.name}'s Orders`} />
      <div className="p-4">
        <Typography component="h1" variant="h4" className="mb-4">
          {user.name}'s Orders
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          {orders.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="bg-white rounded-lg shadow"
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrder;