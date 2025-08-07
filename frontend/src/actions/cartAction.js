import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import { baseURL } from "../config/config";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${baseURL}/api/v1/product/${id}`);
  const { user } = getState().user;

  if (!user) 
  return;

  const item = {
    product: data.product._id,
    name: data.product.name,
    price: data.product.price,
    image: data.product.images[0].url,
    stock: data.product.Stock,
    quantity,
  };

  dispatch({
    type: ADD_TO_CART,
    payload: item,
  });

  const allCarts = JSON.parse(localStorage.getItem('cart')) || {};

  allCarts[user._id] = getState().cart.cartItems;

  localStorage.setItem('cart', JSON.stringify(allCarts));
};


export const removeItemsFromCart = (id) => (dispatch, getState) => {
  const { user } = getState().user;
  if (!user) 
    return;

  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  const allCarts = JSON.parse(localStorage.getItem('cart')) || {};
  allCarts[user._id] = getState().cart.cartItems;
  localStorage.setItem('cart', JSON.stringify(allCarts));
};


export const saveShippingInfo = (data) => async(dispatch,getState) =>{
  dispatch({
    type:SAVE_SHIPPING_INFO,
    payload:data
  })

  localStorage.setItem("shippingInfo",JSON.stringify(data));
}


