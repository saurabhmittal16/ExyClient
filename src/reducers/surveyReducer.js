import { ADD_SURVEY, GET_UNAPPROVED_SURVEY } from '../actions/types';

const initialState = {
    surveys: [],
    unapprovedSurveys: [],
    pagination: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SURVEY: {
            return {
                surveys: [...state.surveys, action.payload]
            }
        }
        case GET_UNAPPROVED_SURVEY: {
            if (state.pagination.page === action.payload.page || action.payload.last)
                return {
                    ...state,
                    pagination: {
                        page: action.payload.page,
                        last: action.payload.last
                    }
                }
            return {
                ...state,
                pagination: {
                    page: action.payload.page,
                    last: action.payload.last
                },
                unapprovedSurveys: [
                    ...state.unapprovedSurveys,
                    ...action.payload.data
                ]
            }
        }
        default:
            return state;
    }
}