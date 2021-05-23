import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';

import {Redirect, useHistory} from 'react-router-dom';

import {getUser, logout} from '../../services/user';

import Projects from '../Projects';
import Report from '../Report';

import './Shell.css';

const Shell = () => {
    const user = getUser();
    const history = useHistory();

    const onLogoutClick = () => {
        logout();
        history.push('/login');
    };

    return (
        <>
            {!user && <Redirect to="/login"/>}

            <AppBar position="fixed">
                <Toolbar variant="dense" className="main-toolbar">
                    <Typography variant="h6" color="inherit" className="toolbar-text">
                        היי, {user && user.name}
                    </Typography>

                    <IconButton color="inherit" onClick={onLogoutClick}>
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box mt={8}>
                {user && user.isManager ? <Report/> : <Projects/>}
            </Box>
        </>
    );
};

export default Shell;
