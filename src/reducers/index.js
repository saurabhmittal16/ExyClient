import { combineReducers } from 'redux';

import authReducer from './authReducer';
import surveyReducer from './surveyReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    survey: surveyReducer,
    error: errorReducer
});

export default rootReducer;