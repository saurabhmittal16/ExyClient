import React from "react";
import { Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import NewSurvey from './NewSurvey';
import Albums from './Albums';

class Router extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/survey/new' component={NewSurvey} />
                    <Route exact path='/albums' component={Albums}/>
                </Switch>
            </div>
        );
    }
}

export default Router;