import { GET_USER_DETAILS, SET_SUB_USERS } from '../actions/types';

const initialState = {
    details: {},
    subUsers: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DETAILS:
            return {
                details: action.payload
            }
        case SET_SUB_USERS:
            return {
                subUsers: action.payload
            }
        default:
            return state;
    }
}