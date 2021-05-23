import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Redirect, useHistory} from 'react-router-dom';

import {log} from '../../services/error';
import {getUser, logout, setUser} from '../../services/user';
import Project from './Project/Project';

import './Coins.css';
import Box from "@material-ui/core/Box";

const Coins = () => {
    const user = getUser();

    const [loaded, setLoaded] = useState(false);
    const [coins, setCoins] = useState(0);
    const [projects, setProjects] = useState([]);
    const timeoutId = useRef(0);
    const cancelTokenSource = useRef(null);
    const history = useHistory();

    const onLogoutClick = () => {
        logout();
        history.push('/login');
    };

    const setDataFetchTimeout = () => {
        timeoutId.current = setTimeout(loadData, 1500);
    };

    const loadCoins = () => axios.get('/api/user', {params: {userId: user.id}}, {cancelToken: cancelTokenSource.current.token})
        .then(({data: {coins}}) => {
            setCoins(coins);
            setLoaded(true);
        });

    const loadProjects = () => axios.get('/api/projects', {params: {userId: user.id}}, {cancelToken: cancelTokenSource.current.token})
        .then(({data: projects}) => {
            setProjects(projects);
        });

    const loadData = () => {
        if (!user) {
            return;
        }

        cancelTokenSource.current = axios.CancelToken.source();

        Promise.all([loadCoins(), loadProjects()])
            .then(() => {
                setLoaded(true);
            })
            .catch(log)
            .finally(setDataFetchTimeout);
    };

    useEffect(() => {
        loadData();

        return () => {
            clearTimeout(timeoutId.current);

            if (cancelTokenSource.current) {
                cancelTokenSource.current.cancel();
            }
        };
    }, []);

    return (
        <>
            {!user && <Redirect to="/login"/>}

            <AppBar position="fixed">
                <Toolbar variant="dense" className="main-toolbar">
                    <Typography variant="h6" color="inherit" className="toolbar-text">
                        היי, {user && user.name}
                    </Typography>

                    <Button edge="end" variant="contained" color="secondary" onClick={onLogoutClick}>יציאה</Button>
                </Toolbar>
            </AppBar>

            <Box mt={8}>
                {!loaded && <span>טוען את המידע שלך...</span>}
                {loaded && <span>
                    יש לך <b>{coins}</b> מטבעות
                </span>}
            </Box>

            {projects.map(x => <Project key={x.id} project={x} userCoins={coins}/>)}
        </>
    );
};

export default Coins;
