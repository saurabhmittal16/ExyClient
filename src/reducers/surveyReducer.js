import { ADD_SURVEY, CLEAR_SURVEY, GET_UNAPPROVED_SURVEY, GET_APPROVED_SURVEY } from '../actions/types';

const initialState = {
    approvedSurveys: [],
    approvedPage: {},
    unapprovedSurveys: [],
    unapprovedPage: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SURVEY: {
            // fix: is this required
            return state;
        }
        case CLEAR_SURVEY: {
            return initialState;   
        }
        case GET_UNAPPROVED_SURVEY: {
            if (action.payload.page === 1) {
                return {
                    ...state,
                    unapprovedSurveys: action.payload.data,
                    unapprovedPage: {
                        page: action.payload.page,
                        last: action.payload.last
                    }
                }
            }
            return {
                ...state,
                unapprovedSurveys: [
                    ...state.unapprovedSurveys,
                    ...action.payload.data
                ],
                unapprovedPage: {
                    page: action.payload.page,
                    last: action.payload.last
                },
            }
        }
        case GET_APPROVED_SURVEY: {
            if (action.payload.page === 1) {
                return {
                    ...state,
                    approvedSurveys: action.payload.data,
                    approvedPage: {
                        page: action.payload.page,
                        last: action.payload.last
                    }
                }
            }
            return {
                ...state,
                approvedSurveys: [
                    ...state.approvedSurveys,
                    ...action.payload.data
                ],
                approvedPage: {
                    page: action.payload.page,
                    last: action.payload.last
                },
            }
        }
        default:
            return state;
    }
}