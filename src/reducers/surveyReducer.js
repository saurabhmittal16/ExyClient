import { ADD_SURVEY } from '../actions/types';

const initialState = {
    surveys: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SURVEY: {
            return {
                surveys: [...state.surveys, action.payload]
            }
        }
        default:
            return state;
    }
}