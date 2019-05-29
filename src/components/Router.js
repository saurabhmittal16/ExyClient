import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import RequireAdminAuth from '../utils/requireAdminAuth';
import Loading from './Utils/Loading';

const Dashboard = lazy(() => import('./Dashboard'));
const NewSurvey = lazy(() => import('./NewSurvey'));
const Albums = lazy(() => import('./Albums/Albums'));
const NewAlbum = lazy(() => import('./Albums/NewAlbum'));
const SubUser = lazy(() => import('./SubUsers/SubUsers'));
const NewSubUser = lazy(() => import('./SubUsers/NewSubUser'));
const PendingSurvey = lazy(() => import('./ViewSurvey/PendingSurvey'));
const ApprovedSurvey = lazy(() => import('./ViewSurvey/ApprovedSurvey'));
const PublishedSurvey = lazy(() => import('./ViewSurvey/PublishedSurvey'));

class Router extends React.Component {
    render() {
        return (
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/survey/new' component={NewSurvey} />
                    <Route exact path='/survey/pending' component={PendingSurvey} />
                    <Route exact path='/survey/ready' component={ApprovedSurvey} />
                    <Route exact path='/survey/published' component={PublishedSurvey} />
                    <Route exact path='/albums' component={Albums} />
                    <Route exact path='/albums/new' component={RequireAdminAuth(NewAlbum)} />
                    <Route exact path='/subusers' component={RequireAdminAuth(SubUser)} />
                    <Route exact path='/subusers/new' component={RequireAdminAuth(NewSubUser)} />
                </Switch>
            </Suspense>
        );
    }
}

export default Router;