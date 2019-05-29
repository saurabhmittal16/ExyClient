import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import RequireAuth from '../utils/requireAuth';
import MainLoading  from './Utils/MainLoading';

const Login = lazy(() => import('./Login'));
const Signup = lazy(() => import('./Signup'));
const Container = lazy(() => import('./Container'));

const ForgotPassword = () => <h1>ForgotPassword</h1>;

const NotFound = () => <h1>Page not found</h1>;

class App extends React.Component {
	render() {
		return (
            <Suspense fallback={<MainLoading />}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/forgot" component={ForgotPassword} />
                        <Route path="/" component={RequireAuth(Container)} />
                        <Route exact path="*" component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </Suspense>
		);
	}
}

export default App;