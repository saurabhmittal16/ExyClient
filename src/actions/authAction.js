import axios from 'axios';
import setAuthHeaders from '../utils/setAuthHeaders';
import config from '../config';
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from './types';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user: user
    };
}

export function removeCurrentUser() {
    return {
        type: REMOVE_CURRENT_USER
    }
}

export async function login(user) {
    const res = await axios.post(`${config.server_url}/api/auth/admin/login`, user);

    if (res.status === 200 && res.data.code === 2 ) {
        const token = res.data.token;
        localStorage.setItem('token', token);
        setAuthHeaders(token);
    }
    return res;
}