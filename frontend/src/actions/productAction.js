import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, CLEAR_ERRORS , PRODUCT_DETAILS_FAIL , PRODUCT_DETAILS_REQUEST , PRODUCT_DETAILS_SUCCESS, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, NEW_PRODUCT_SUCCESS, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL } from "../constants/productConstants"; 
import { baseURL } from "../config/config";

export const getProduct = (keyword = "",page = 1,price=[0,25000],category,ratings=0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let link = `${baseURL}/api/v1/product?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        
        if(category){
            link =`${baseURL}/api/v1/product?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const { data } = await axios.get(`${link}`);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
};

export const getProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`${baseURL}/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        });
    } catch (error) {
        console.error("Error fetching products:", error.response ? error.response.data.message : error.message);
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};

export const newReview = (reviewData) => async(dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }

        const { data } = await axios.put(`${baseURL}/api/v1/review`,reviewData,config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        console.error("Error fetching products:", error.response ? error.response.data.message : error.message);
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};

export const getAdminProduct = () => async(dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });

        const { data } = await axios.get(`${baseURL}/api/v1/admin/products`);

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        });
    } catch (error) {
        console.error("Error fetching products:", error.response ? error.response.data.message : error.message);
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};

export const createProduct = (productData) => async(dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: { 
              "Content-Type": "multipart/form-data"  // Important for file upload
            },
          };

        const { data } = await axios.post(`${baseURL}/api/v1/admin/product/new`,productData,config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.error("Error fetching products:", error.response ? error.response.data.message : error.message);
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};

export const deleteProduct = (id) => async(dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axios.delete(`${baseURL}/api/v1/admin/product/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        console.error("Error fetching products:", error.response ? error.response.data.message : error.message);
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};

export const getAdminProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        
        // Log the API call
        console.log('Fetching product:', `${baseURL}/api/v1/admin/product/${id}`);

        const { data } = await axios.get(`${baseURL}/api/v1/admin/product/${id}`);
        console.log('Response:', data);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        });
    } catch (error) {
        console.error("Error details:", error);
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response?.data?.message || "Product not found"
        });
    }
};

export const editProduct = (id, productData) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        
        const { data } = await axios.put(`${baseURL}/api/v1/admin/product/${id}`, productData);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        console.error("Error updating product:", error.response?.data.message || error.message);
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response?.data.message || error.message
        });
    }
};

export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });
  
      const { data } = await axios.get(`${baseURL}/api/v1/reviews?id=${id}`);
  
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
};

export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
  
      const { data } = await axios.delete(
        `${baseURL}/api/v1/reviews?id=${reviewId}&productId=${productId}`
      );
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
};

export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}
