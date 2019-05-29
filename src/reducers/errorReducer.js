import { SET_ERRORS, CLEAR_ERRORS } from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case SET_ERRORS: 
            return {
                data: action.payload
            };
        case CLEAR_ERRORS: {
            return {}
        }
        default:
            return state;
    }
}