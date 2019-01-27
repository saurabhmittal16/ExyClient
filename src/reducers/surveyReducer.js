import { ADD_SURVEY, GET_UNAPPROVED_SURVEY, GET_APPROVED_SURVEY } from '../actions/types';

const initialState = {
    approvedSurveys: [],
    approvedPage: {},
    unapprovedSurveys: [],
    unapprovedPage: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_SURVEY: {
            return {
                surveys: [...state.surveys, action.payload]
            }
        }
        case GET_UNAPPROVED_SURVEY: {
            if (state.unapprovedPage.last) {
                return state;
            }
            return {
                ...state,
                unapprovedPage: {
                    page: action.payload.page,
                    last: action.payload.last
                },
                unapprovedSurveys: [
                    ...state.unapprovedSurveys,
                    ...action.payload.data
                ]
            }
        }
        case GET_APPROVED_SURVEY: {
            if (state.approvedPage.last) {
                return state;
            }
            return {
                ...state,
                approvedPage: {
                    page: action.payload.page,
                    last: action.payload.last
                },
                approvedSurveys: [
                    ...state.approvedSurveys,
                    ...action.payload.data
                ]
            }
        }
        default:
            return state;
    }
}