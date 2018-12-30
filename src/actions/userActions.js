import axios from 'axios';
import config from '../config';
import { SET_USER_DETAILS, SET_SUB_USERS, SET_ERRORS, CLEAR_ERRORS, ADD_ALBUM } from './types';

// Get User details
export const getUserDetails = () => {
    console.log("Fetching user details");
    return async dispatch => {
        try {
            const res = await axios.get(`${config.server_url}/api/admin/details`);
            if (res.status === 200) {
                dispatch({
                    type: CLEAR_ERRORS
                });
                dispatch({
                    type: SET_USER_DETAILS,
                    payload: res.data
                });
            }
        } catch (err) {
            console.log(err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            })
        }
    }
}

// Get User's subusers
export const getSubUsers = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${config.server_url}/api/sub-admin`);
            if (res.status === 200) {
                dispatch({ type: CLEAR_ERRORS });
                dispatch({
                    type: SET_SUB_USERS,
                    payload: res.data
                });
            }
        } catch (err) {
            console.log(err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            });
        }
    }
}

// Add album
export const addNewAlbum = (values) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${config.server_url}/api/admin/albums`, values);
            if (res.status === 200) {
                dispatch({ type: CLEAR_ERRORS });
                dispatch({
                    type: ADD_ALBUM,
                    payload: res.data
                })
            }
        } catch (err) {
            console.log(err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            });
        }
    }
}