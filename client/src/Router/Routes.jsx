import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Login from '../components/Login';
import Coins from '../components/Coins';

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/">
                <Coins />
            </Route>
        </Switch>
    </Router>
);

export default Routes;
