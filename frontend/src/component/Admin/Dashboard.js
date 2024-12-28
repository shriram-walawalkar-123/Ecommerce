import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { LineChart, Line as RechartsLine, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../actions/productAction';
import Sidebar from './Sidebar';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userActions';

const Dashboard = () => {
   const dispatch = useDispatch();
   const {products} = useSelector(state => state.products)
   const {users} = useSelector(state => state.allUsers)
   const {orders} = useSelector(state => state.allOrders);

   let outOfStocks = 0;

   products && products.forEach((item) => {
    if(item.Stock === 0)
      outOfStocks += 1;
   })

   useEffect(() => {
    dispatch(getAdminProduct())
    dispatch(getAllOrders());
    dispatch(getAllUsers())
   },[dispatch])

   let totalAmount = 0;
   orders && orders.forEach((item)=>totalAmount += item.totalPrice)

  const lineData = [
    { name: 'Initial Amount', amount: 0 },
    { name: 'Amount Earned', amount: totalAmount }
  ];

  const pieData = [
    { name: 'Out of Stock', value: outOfStocks },
    { name: 'InStock', value: products.length-outOfStocks }
  ];
  const COLORS = ['#00A684', '#680084'];

  const stats = [
    { name: 'Product', value: products && products.length, href: '/admin/products' },
    { name: 'Order', value: orders && orders.length, href: '/admin/orders' },
    { name: 'User', value: users && users.length, href: '/admin/users' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>
        
        {/* Total Amount Card */}
        <Card>
          <CardContent>
          <Typography>Total Amount</Typography>
            <p className="text-3xl font-bold">₹{totalAmount}</p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6">
          {stats.map((stat) => (
            <a 
              key={stat.name}
              href={stat.href}
              className="block"
            >
              <Card className="hover:bg-gray-50 transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Typography className="text-lg text-gray-600 mb-2">{stat.name}</Typography>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
          {/* Line Chart */}
          <Card>
            <CardHeader>
              <Typography>Revenue Overview</Typography>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <RechartsLine
                    type="monotone"
                    dataKey="amount"
                    stroke="#ff6347"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <Typography>Stock Status</Typography>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;