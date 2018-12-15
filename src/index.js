import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import rootReducer from './reducers';
import setAuthHeaders from './utils/setAuthHeaders';
import { setCurrentUser } from './actions/authAction';

import './styles/main.css';
import App from './components/App';

const store = createStore(
    rootReducer
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