import React from "react";
import { Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import NewSurvey from './NewSurvey';

class Router extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/survey/new' component={NewSurvey} />
                </Switch>
            </div>
        );
    }
}

export default Router;