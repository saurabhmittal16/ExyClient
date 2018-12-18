import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthHeaders from '../utils/setAuthHeaders';
import config from '../config';
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from './types';

export const login = (values) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${config.server_url}/api/auth/admin/login`, values);
            if (response.status === 200 && response.data.code === 2) {
                const token = response.data.token;
                const user = jwtDecode(token);
                dispatch(setCurrentUser(user));
                localStorage.setItem('token', token);
                setAuthHeaders(token);
            }
            return response;
        } catch (err) {
            console.log(err.response);
            return err.response;
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