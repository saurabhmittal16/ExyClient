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

export function login(user) {
    console.log("Inside auth actions", user);
}