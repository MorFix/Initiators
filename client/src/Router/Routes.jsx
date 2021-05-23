import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import {getUsername} from '../services/user';

import Login from '../components/Login';
import Coins from '../components/Coins';

const Routes = () => {
    const user = getUsername();

    return (
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
    )
};

export default Routes;
