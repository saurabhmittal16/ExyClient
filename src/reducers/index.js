import { combineReducers } from 'redux';

import authReducer from './authReducer';
import surveyReducer from './surveyReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    survey: surveyReducer,
    error: errorReducer,
    user: userReducer
});

export default rootReducer;