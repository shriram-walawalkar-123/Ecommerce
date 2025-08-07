import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; // Fixed import
import { productDetailsReducer, newReviewReducer, newProductReducer, productsReducer, deleteProductReducer, reviewReducer, productReviewsReducer } from "./reducers/productReducer";
import { userReducer, profileReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, editAndDeleteOrderReducer, myOrdersReducer, newOrderReducer, OrderDetailReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: OrderDetailReducer,
  newReview:newReviewReducer,
  newProduct:newProductReducer,
  product:deleteProductReducer,
  allOrders:allOrdersReducer,
  order:editAndDeleteOrderReducer,
  allUsers:allUsersReducer,
  userDetails:userDetailsReducer,
  review:reviewReducer,
  productReviews:productReviewsReducer
});

const userInfoFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const allCarts = JSON.parse(localStorage.getItem("cart")) || {};

const cartItemsFromStorage = userInfoFromStorage
  ? allCarts[userInfoFromStorage._id] || []
  : [];

const initialState = {
  user: { user: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
};

const store = createStore(reducer, initialState, applyMiddleware(thunk)); // Fixed initialState typo

export default store;
