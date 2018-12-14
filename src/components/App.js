import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Auth/Login';
import Container from './Container';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/' component={Container} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;