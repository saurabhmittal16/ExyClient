import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from './types';

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