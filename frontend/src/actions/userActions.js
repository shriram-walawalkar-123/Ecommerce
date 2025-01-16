import axios from "axios";
import { LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,CLEAR_ERRORS, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,LOAD_USER_FAIL,LOAD_USER_SUCCESS,LOGOUT_USER_FAIL,LOGOUT_USER_SUCCESS,UPDATE_PROFILE_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, LOAD_USER_REQUEST } from "../constants/userConstants";
import { baseURL } from "../config/config";

export const login = (email,password) => async(dispatch) =>{
    try{
        dispatch({
            type:LOGIN_REQUEST
        })

        const config = {
          headers:{
          "Content-Type":"application/json",         
        },
      }

        const {data} = await axios.post(`${baseURL}/api/v1/login`,{email,password},config);
        console.log("data of login  " , data.token);

       // Store token in localStorage and in axios defaults
        if (data.token) {
             console.log(" Storing The Token on LocalStorage  ",data.token);
             localStorage.setItem('token', data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        }

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
    }catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        })
    }
}

export const register = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    };

    const { data } = await axios.post(`${baseURL}/api/v1/register`, formData, config);

    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data?.message || 'Registration failed',
    });
  }
};


export const loadUser = () => async(dispatch) =>{
  try{
    dispatch({
      type:LOAD_USER_REQUEST
    })

    const token = localStorage.getItem('token');
    const config = {
    headers: {
    'Authorization': `Bearer ${token}`
    }
    };

    const { data } = await axios.get(`${baseURL}/api/v1/me`, config);

      dispatch({
          type:LOAD_USER_SUCCESS,
          payload:data.user
      })
  }catch(error){
      dispatch({
          type:LOAD_USER_FAIL,
          payload:error.response.data.message
      })
  }
}

export const logOut = () => async(dispatch) => {
  try {
    const config = {
      withCredentials: true  // Add this
    };
    
    await axios.get(`${baseURL}/api/v1/logout`,config);

    dispatch({
      type: LOGOUT_USER_SUCCESS
    });
  } catch(error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response?.data?.message || 'Logout failed'
    });
  }
}


export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const token = localStorage.getItem('token');
    const config = {
    headers: {
    'Authorization': `Bearer ${token}`
    }
    };

    const { data } = await axios.put(`${baseURL}/api/v1/me/update`, userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success
    });

    return data;
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.message || 'Update failed'
    });
    throw error; 
  }
};


export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const token = localStorage.getItem('token');
    const config = {
    headers: {
    'Authorization': `Bearer ${token}`
    }
    };

    const { data } = await axios.put(`${baseURL}/api/v1/password/update`, passwords, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success
    });

    return data; 
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response?.data?.message || 'Update failed'
    });
    throw error; 
  }
};


export const forgotPassword = (email) => async(dispatch) =>{
  try{
      dispatch({
          type:FORGOT_PASSWORD_REQUEST
      })

      const token = localStorage.getItem('token');
      const config = {
      headers: {
      'Authorization': `Bearer ${token}`
      }
      };

      const {data} = await axios.post(`${baseURL}/api/v1/password/forgot`,email,config);

      dispatch({
          type:FORGOT_PASSWORD_SUCCESS,
          payload:data.message
      })
  }catch(error){
      dispatch({
          type:FORGOT_PASSWORD_FAIL,
          payload:error.response.data.message
      })
  }
}


export const resetPassword = (token,passwords) => async(dispatch) =>{
  try{
      dispatch({
          type:RESET_PASSWORD_REQUEST
      })

      const token = localStorage.getItem('token');
      const config = {
      headers: {
      'Authorization': `Bearer ${token}`
      }
      };

      const {data} = await axios.put(`${baseURL}/api/v1/password/reset/${token}`,passwords,config);

      dispatch({
          type:RESET_PASSWORD_SUCCESS,
          payload:data.success
      })
  }catch(error){
      dispatch({
          type:RESET_PASSWORD_FAIL,
          payload:error.response.data.message
      })
  }
}

export const getAllUsers = () => async(dispatch) => {
   try{
   dispatch({type:ALL_USERS_REQUEST})

   const token = localStorage.getItem('token');
   const config = {
   headers: {
   'Authorization': `Bearer ${token}`
   }
   };

   const {data} = await axios.get(`${baseURL}/api/v1/admin/users`,config);

   dispatch({
    type:ALL_USERS_SUCCESS,
    payload:data.users
   })
  }catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
}

export const deleteUser = (id) => async(dispatch) => {
  try{
    dispatch({type:DELETE_USER_REQUEST})

    const token = localStorage.getItem('token');
    const config = {
    headers: {
    'Authorization': `Bearer ${token}`
    }
    };

    const {data} = await axios.delete(`${baseURL}/api/v1/admin/user/${id}`,config)

    dispatch({
      type:DELETE_USER_SUCCESS,
      payload:data
    })
  }catch(error){
    dispatch({
      type:DELETE_USER_FAIL,
      payload:error.response.data.message
    })
  }
}

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const token = localStorage.getItem('token');
    const config = {
    headers: {
    'Authorization': `Bearer ${token}`
    }
    };

    const { data } = await axios.get(`${baseURL}/api/v1/admin/user/${id}`,config);

    dispatch({ 
      type: USER_DETAILS_SUCCESS, 
      payload: data.user 
    });
  } catch (error) {
    dispatch({ 
      type: USER_DETAILS_FAIL, 
      payload: error.response.data.message 
    });
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const token = localStorage.getItem('token');
    const config = {
    headers: {
    'Authorization': `Bearer ${token}`
    }
    };

    const { data } = await axios.put(`${baseURL}/api/v1/admin/user/${id}`,userData,config);

    dispatch({ 
      type: UPDATE_USER_SUCCESS, 
      payload: data.success 
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS
    })
}