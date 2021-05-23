import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Login from '../components/Login';
import Shell from '../components/Shell';

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/">
                <Shell />
            </Route>
        </Switch>
    </Router>
);

export default Routes;
