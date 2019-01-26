import React from "react";
import { Switch, Route } from 'react-router-dom';
import RequireAdminAuth from '../utils/requireAdminAuth';

import Dashboard from './Dashboard';
import NewSurvey from './NewSurvey';
import Albums from './Albums/Albums';
import NewAlbum from './Albums/NewAlbum';
import SubUser from './SubUsers/SubUsers';
import NewSubUser from './SubUsers/NewSubUser';
import PendingSurvey from "./ViewSurvey/PendingSurvey";
import ApprovedSurvey from "./ViewSurvey/ApprovedSurvey";

class Router extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/survey/new' component={NewSurvey} />
                    <Route exact path='/survey/pending' component={PendingSurvey} />
                    <Route exact path='/survey/ready' component={ApprovedSurvey} />
                    <Route exact path='/albums' component={Albums} />
                    <Route exact path='/albums/new' component={RequireAdminAuth(NewAlbum)} />
                    <Route exact path='/subusers' component={RequireAdminAuth(SubUser)} />
                    <Route exact path='/subusers/new' component={RequireAdminAuth(NewSubUser)} />
                </Switch>
            </div>
        );
    }
}

export default Router;