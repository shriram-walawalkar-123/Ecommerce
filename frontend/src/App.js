import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useSelector } from 'react-redux';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginAndSignUp from './component/User/LoginAndSignUp';
import store from "./store";
import { loadUser } from './actions/userActions';
import UserOptions from './component/layout/Header/UserOptions';
import { Provider } from 'react-redux';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import axios from "axios"
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrder from './component/Order/MyOrder';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import { baseURL } from './config/config';

const App = () => {
  const { user, isAuthenticated } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    store.dispatch(loadUser());
    
    const getStripeApiKey = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true  
        };

        const { data } = await axios.get(
          `${baseURL}/api/v1/stripeapikey`,
          config
        );
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.error("Error fetching Stripe API Key:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      getStripeApiKey();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]); 
  const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

  if (loading) {
    return <div>Loading...</div>;
  }

  // const { user, isAuthenticated } = useSelector(state => state.user);
  // const [stripeApiKey,setStripeApiKey] = useState(null); 

  // useEffect(() => {
  //   store.dispatch(loadUser());
  //   async function getStripeApiKey() {
  //     try {
  //       const { data } = await axios.get(`${baseURL}/api/v1/stripeapikey`);
  //       setStripeApiKey(data.stripeApiKey);
  //     } catch (error) {
  //       console.error("Error fetching Stripe API Key:", error);
  //     }
  //   }

  //   getStripeApiKey();
  // }, []);

  // const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          {isAuthenticated && <UserOptions user={user} />}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<LoginAndSignUp />} />
              <Route path="/password/forgot" element={<ForgotPassword/>} />
              <Route path='/password/reset/:token' element={<ResetPassword/>}/>
              <Route path='/cart' element={<Cart/>}/>

              <Route element={<ProtectedRoute/>}>
              <Route path="/account" element={<Profile/>} />
              <Route path="/me/update" element={<UpdateProfile/>} />
              <Route path="/password/update" element={<UpdatePassword/>} />
              <Route path="/shipping" element={<Shipping/>} />
              <Route path="/success" element={<OrderSuccess/>} />
              <Route path="/orders" element={<MyOrder/>} />
              <Route path="/order/confirm" element={<ConfirmOrder/>} />
              <Route path="/order/:id" element={<OrderDetails/>} />
              <Route  isAdmin={true} path="/admin/dashboard" element={<Dashboard/>} />
              <Route  isAdmin={true} path="/admin/products" element={<ProductList/>} />
              <Route  isAdmin={true} path="/admin/product" element={<NewProduct/>} />
              <Route  isAdmin={true} path="/admin/product/:id" element={<UpdateProduct/>} />
              <Route  isAdmin={true} path="/admin/orders" element={<OrderList/>} />
              <Route  isAdmin={true} path="/admin/order/:id" element={<ProcessOrder/>} />
              <Route  isAdmin={true} path="/admin/users" element={<UsersList/>} />
              <Route  isAdmin={true} path="/admin/user/:id" element={<UpdateUser/>} />
              <Route  isAdmin={true} path="/admin/reviews" element={<ProductReviews/>}/>
              </Route>
              
              {stripeApiKey && stripePromise && (
              <Route element={<ProtectedRoute />}>
              <Route
              path="/process/payment"
              element={<Elements stripe={stripePromise}> <Payment /></Elements>}/>
              </Route>
              )}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;