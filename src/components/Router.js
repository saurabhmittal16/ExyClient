import React from "react";
import { Switch, Route } from 'react-router-dom';
import RequireAdminAuth from '../utils/requireAdminAuth';

import Dashboard from './Dashboard';
import NewSurvey from './NewSurvey';
import Albums from './Albums';
import SubUser from './SubUsers/SubUsers';

class Router extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/survey/new' component={NewSurvey} />
                    <Route exact path='/albums' component={Albums}/>
                    <Route exact path='/subusers' component={RequireAdminAuth(SubUser)} />
                </Switch>
            </div>
        );
    }
}

export default Router;