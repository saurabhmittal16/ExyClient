import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';

// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import setAuthHeaders from './utils/setAuthHeaders';
import { setCurrentUser } from './actions/authAction';

import App from './components/App';
import './styles/main.css';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
    )
);

const token = localStorage.getItem('token')
if (token) {
    setAuthHeaders(token);
    store.dispatch(setCurrentUser(jwtDecode(token)));
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// To-Do: Implement PropTypes