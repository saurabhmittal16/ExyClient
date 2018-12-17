import axios from 'axios';
import config from '../config';
import { SET_CURRENT_USER, REMOVE_CURRENT_USER, GET_USER_DETAILS, SET_ERRORS, CLEAR_ERRORS } from './types';

// Get User details
export const getUserDetails = () => {
    console.log("Fetching user details");
    return async dispatch => {
        try {
            const res = await axios.get(`${config.server_url}/api/admin/details`);
            console.log("User details fetched", res.data);
            if (res.status === 200) {
                dispatch({
                    type: CLEAR_ERRORS
                });
                dispatch({
                    type: GET_USER_DETAILS,
                    payload: res.data
                });
            }
        } catch (err) {
            console.log("Caught", err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            })
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch(removeCurrentUser());
    }
}

// Set current user
export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user: user
    };
}

// Remove current user
export const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER
    }
}