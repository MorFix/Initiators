import React, {useState, useEffect, useRef} from 'react';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';

import {log} from '../../services/error';
import {getUsername, logout} from '../../services/user';

const Coins = () => {
    const [loaded, setLoaded] = useState(false);
    const [coins, setCoins] = useState('');
    const timeoutId = useRef(0);
    const componentUnmounted = useRef(false);
    const history = useHistory();

    const onLogoutClick = () => {
        logout();
        history.push('/login');
    };

    const setCoinsFetch = () => {
        if (!componentUnmounted.current) {
            timeoutId.current = setTimeout(loadCoins, 3000);
        }
    };

    const loadCoins = () => {
        axios.get('/api/user', {params: {user: getUsername()}})
            .then(({data: {coins}}) => {
                setLoaded(true);
                setCoins(coins);
            })
            .catch(log)
            .finally(setCoinsFetch);
    };

    useEffect(() => {
        loadCoins();

        return () => {
            componentUnmounted.current = true;
            clearTimeout(timeoutId.current);
        };
    }, []);

    const username = getUsername();

    return (
        <>
            {!username && <Redirect to="/login" />}
            <p>
                היי, {username}
            </p>
            {!loaded && <p>
                טוען את המטבעות שלך...
                {!loaded ? '' : `יש לך ${coins} מטבעות`}
            </p>}
            {loaded && <Box>
                יש לך <b>{coins}</b> מטבעות
            </Box>}

            <p>
                <Button variant="contained" color="secondary" onClick={onLogoutClick}>יציאה</Button>
            </p>
        </>
    );
};

export default Coins;
