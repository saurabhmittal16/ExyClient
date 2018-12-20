import { SET_USER_DETAILS, SET_SUB_USERS, ADD_ALBUM } from '../actions/types';

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
        case ADD_ALBUM:
            return {
                subUsers: state.subUsers,
                details: {
                    ...state.details,
                    albums: action.payload
                }
            }
        default:
            return state;
    }
}