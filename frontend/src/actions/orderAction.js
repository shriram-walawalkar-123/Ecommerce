import axios from "axios";
import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDERS_FAIL, DELETE_ORDERS_REQUEST, DELETE_ORDERS_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDERS_FAIL, UPDATE_ORDERS_REQUEST, UPDATE_ORDERS_SUCCESS } from "../constants/orderConstatnts";
import { baseURL } from "../config/config";

export const createOrder = (order) => async(dispatch) => {
    try{
        dispatch({
            type:CREATE_ORDER_REQUEST
        })

        const token = localStorage.getItem('token');
        const config = {
        headers: {
        'Authorization': `Bearer ${token}`
        }
        };
    
    const {data} = await axios.post(`${baseURL}/api/v1/order/new`,order,config);

    dispatch({
        type:CREATE_ORDER_SUCCESS,
        payload:data
    })

    }catch(error){
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
}


export const myOrders = () => async (dispatch) => {
    try {
      dispatch({ type: MY_ORDERS_REQUEST });
  
      const token = localStorage.getItem('token');
      const config = {
      headers: {
      'Authorization': `Bearer ${token}`
      }
      };
  
      const { data } = await axios.get(`${baseURL}/api/v1/orders/me`, config);
  
      dispatch({
        type: MY_ORDERS_SUCCESS,
        payload: data.orders,
      });
    } catch (error) {
      dispatch({
        type: MY_ORDERS_FAIL,
        payload: error.response?.data?.message || "Failed to fetch orders",
      });
    }
  };
  

export const getOrderDetails = (id) => async(dispatch) => {
    try{
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })

        const token = localStorage.getItem('token');
        const config = {
        headers: {
        'Authorization': `Bearer ${token}`
        }
        };

    const {data} = await axios.get(`${baseURL}/api/v1/order/${id}`,config);

    dispatch({
        type:ORDER_DETAILS_SUCCESS,
        payload:data.order
    })

    }catch(error){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getAllOrders = () => async(dispatch) => {
    try{
        dispatch({
            type:ALL_ORDERS_REQUEST
        })

        const token = localStorage.getItem('token');
        const config = {
        headers: {
        'Authorization': `Bearer ${token}`
        }
        };

    const {data} = await axios.get(`${baseURL}/api/v1/admin/orders`,config);

    dispatch({
        type:ALL_ORDERS_SUCCESS,
        payload:data.orders
    })

    }catch(error){
        dispatch({
            type:ALL_ORDERS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const updateOrder = (id, order) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDERS_REQUEST });
  
      const token = localStorage.getItem('token');
      const config = {
      headers: {
      'Authorization': `Bearer ${token}`
      }
      };

      const { data } = await axios.put(
        `${baseURL}/api/v1/admin/order/${id}`,
        order,
        config
      );
  
      dispatch({ 
        type: UPDATE_ORDERS_SUCCESS, 
        payload: data.success 
    });
    
    } catch (error) {
      dispatch({
        type: UPDATE_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteOrder = (id) => async(dispatch) => {
    try {
        dispatch({ type: DELETE_ORDERS_REQUEST });

        const token = localStorage.getItem('token');
        const config = {
        headers: {
        'Authorization': `Bearer ${token}`
        }
        };

        const { data } = await axios.delete(`${baseURL}/api/v1/admin/order/${id}`,config);

        dispatch({
            type: DELETE_ORDERS_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        console.error("Error fetching products:", error.response ? error.response.data.message : error.message);
        dispatch({
            type: DELETE_ORDERS_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}