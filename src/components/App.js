import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import RequireAuth from '../utils/requireAuth';
import Login from './Login';
import Signup from './Signup';
import Container from './Container';


const ForgotPassword = () => (
    <h1>ForgotPassword</h1>
);

const NotFound = () => (
    <h1>Page not found</h1>
);

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/forgot' component={ForgotPassword} />
                    <Route path='/' component={RequireAuth(Container)} />
                    <Route exact path='*' component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;