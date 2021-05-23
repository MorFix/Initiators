import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {Redirect, useHistory} from 'react-router-dom';

import {log} from '../../services/error';
import {getUser, logout} from '../../services/user';
import Project from './Project/Project';

const Coins = () => {
    const [loaded, setLoaded] = useState(false);
    const [coins, setCoins] = useState('');
    const [projects, setProjects] = useState([]);
    const timeoutId = useRef(0);
    const history = useHistory();

    const onLogoutClick = () => {
        logout();
        history.push('/login');
    };

    const setDataFetchTimeout = () => {
        timeoutId.current = setTimeout(loadData, 3000);
    };

    const loadCoins = () => axios.get('/api/user', {params: {userId: getUser().id}})
        .then(({data: {coins}}) => {
            setLoaded(true);
            setCoins(coins);
        });

    const loadProjects = () => axios.get('/api/projects', {params: {userId: getUser().id}})
        .then(({data: projects}) => {
            setProjects(projects);
        });

    const loadData = () => {
        const user = getUser();
        if (!user) {
            return;
        }

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
        };
    }, []);

    const {name: userName} = getUser();

    return (
        <>
            {!userName && <Redirect to="/login" />}
            <p>
                היי, {userName}
            </p>
            {!loaded && <p>
                טוען את המידע שלך...
                {!loaded ? '' : `יש לך ${coins} מטבעות`}
            </p>}
            {loaded && <Box>
                יש לך <b>{coins}</b> מטבעות
            </Box>}

            {projects.map(x => <Project key={x.id} project={x}/>)}

            <p>
                <Button variant="contained" color="secondary" onClick={onLogoutClick}>יציאה</Button>
            </p>
        </>
    );
};

export default Coins;
