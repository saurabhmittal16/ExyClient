import { ADD_SURVEY, CLEAR_SURVEY, GET_UNAPPROVED_SURVEY, GET_APPROVED_SURVEY, GET_PUBLISHED_SURVEY, GET_DISCARDED_SURVEY } from '../actions/types';

const initialState = {
    approvedSurveys: null,
    approvedPage: {},
    unapprovedSurveys: null,
    unapprovedPage: {},
    publishedSurveys: null,
    publishedPage: {},
    discardedSurveys: null,
    discardedPage: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SURVEY: {
            // To-Do: is this required
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
        case GET_PUBLISHED_SURVEY: {
            if (action.payload.page === 1) {
                return {
                    ...state,
                    publishedSurveys: action.payload.data,
                    publishedPage: {
                        page: action.payload.page,
                        last: action.payload.last
                    }
                }
            }
            return {
                ...state,
                publishedSurveys: [
                    ...state.publishedSurveys,
                    ...action.payload.data
                ],
                publishedPage: {
                    page: action.payload.page,
                    last: action.payload.last
                },
            }
        }
        case GET_DISCARDED_SURVEY: {
            if (action.payload.page === 1) {
                return {
                    ...state,
                    discardedSurveys: action.payload.data,
                    discardedPage: {
                        page: action.payload.page,
                        last: action.payload.last
                    }
                }
            }
            return {
                ...state,
                discardedSurveys: [
                    ...state.discardedSurveys,
                    ...action.payload.data
                ],
                discardedPage: {
                    page: action.payload.page,
                    last: action.payload.last
                },
            }
        }
        default:
            return state;
    }
}