import { SET_USER_DETAILS, SET_SUB_USERS } from '../actions/types';

const initialState = {
    details: {},
    subUsers: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case SET_SUB_USERS:
            return {
                ...state,
                subUsers: action.payload
            }
        default:
            return state;
    }
}