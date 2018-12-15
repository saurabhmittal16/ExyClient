import { isEmpty } from 'lodash';
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    user: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                isAdmin: action.user.isAdmin,
                user: action.user
            };
        case REMOVE_CURRENT_USER:
            return {
                isAuthenticated: false,
                user: null
            }
        default:
            return state;
    }
}
