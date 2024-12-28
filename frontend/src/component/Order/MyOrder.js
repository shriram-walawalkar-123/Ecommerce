import React, { Fragment, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../actions/userActions';
import { myOrders } from '../../actions/orderAction';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const MyOrder = () => {
  const dispatch = useDispatch();
  const { error, orders = [] } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

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
        <div className="flex items-center">
          {params.value === 'Delivered' ? (
            <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
          ) : (
            <AlertTriangle className="text-yellow-500 w-5 h-5 mr-2" />
          )}
          <span className={`capitalize ${
            params.value === 'Delivered' ? 'text-green-500' : 'text-yellow-500'
          }`}>
            {params.value}
          </span>
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
        <Link
          to={`/order/${params.row.id}`}
          className="text-blue-500 hover:underline"
        >
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

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto bg-white rounded-md shadow-lg p-6">
          <Typography
            variant="h5"
            className="text-2xl font-semibold text-gray-700 mb-6"
          >
            {user.name}'s Orders
          </Typography>
          <div className="">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="bg-gray-100 border rounded-md"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MyOrder;