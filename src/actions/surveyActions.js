import axios from 'axios';
import config from '../config';
import { ADD_SURVEY, SET_ERRORS, CLEAR_ERRORS, GET_UNAPPROVED_SURVEY, GET_APPROVED_SURVEY, CLEAR_SURVEY, GET_PUBLISHED_SURVEY, GET_DISCARDED_SURVEY } from './types';

const prepareRequestBody = (data, type) => {
    let final_options = []; 
    if (data.options) {
        for(let i=0; i<data.option_image.length; i++) {
            let temp = {
                option_text: data.option_text[i],
                option_image: data.option_image[i]
            };
            final_options.push(temp);
        }
    }
    const body = {
        question: data.question,
        image: data.image,
        type: type,
        start: data.start.format(),
        end: data.end.format(),
        approved: data.approval ==='pre',
        category: data.category,
        options: final_options,
        album: data.album,
        resultPolicy: data.result
    }
    console.log(body);  
    return body;
}

// Add Survey
export const addSurvey = (data, type) => {
    const body = prepareRequestBody(data, type);
    return async dispatch => {
        try {
            const res = await axios.post(`${config.server_url}/api/survey`, body);
            if (res.status === 200) {
                dispatch({
                    type: CLEAR_ERRORS,
                });
                dispatch({
                    type: ADD_SURVEY,
                    payload: res.data 
                });
            }
            return res;
        } catch (err) {
            console.log("Caught", err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            });
        }    
    }
};

// Get unapproved surveys
export const getUnapprovedSurveys = (page) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${config.server_url}/api/survey/unapproved?page=${page}`);
            // console.log(`Fetching ${page}`); 
            // console.log(res.data);
            dispatch({
                type: CLEAR_ERRORS,
            });
            dispatch({
                type: GET_UNAPPROVED_SURVEY,
                payload: res.data 
            });
        } catch (err) {
            console.log("Caught", err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            });
        }
    }
}

// Get approved surveys
export const getApprovedSurveys = (page) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${config.server_url}/api/survey/approved?page=${page}`);
            // console.log(`Fetching ${page}`);
            // console.log(res.data);
            dispatch({
                type: CLEAR_ERRORS,
            });
            dispatch({
                type: GET_APPROVED_SURVEY,
                payload: res.data 
            });
        } catch (err) {
            console.log("Caught", err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            });
        }
    }
}

// Get published surveys
export const getPublishedSurveys = (page) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${config.server_url}/api/survey/published?page=${page}`);
            // console.log(`Fetching ${page}`);
            // console.log(res.data);
            dispatch({
                type: CLEAR_ERRORS,
            });
            dispatch({
                type: GET_PUBLISHED_SURVEY,
                payload: res.data 
            });
        } catch (err) {
            console.log("Caught", err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            });
        }
    }
}

// Get discarded surveys
export const getDiscardedSurveys = (page) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${config.server_url}/api/survey/discarded?page=${page}`);
            // console.log(`Fetching ${page}`);
            // console.log(res.data);
            dispatch({
                type: CLEAR_ERRORS,
            });
            dispatch({
                type: GET_DISCARDED_SURVEY,
                payload: res.data 
            });
        } catch (err) {
            console.log("Caught", err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            });
        }
    }
}

// Clear survey state
export const clearSurvey = () => {
    return async dispatch => {
        dispatch({
            type: CLEAR_SURVEY
        });
    }
}