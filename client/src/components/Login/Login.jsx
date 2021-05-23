import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import SyncLoader from 'react-spinners/SyncLoader'
import axios from 'axios';
import {Redirect, useHistory} from 'react-router-dom';

import {log} from '../../services/error';
import {getUser, setUser} from "../../services/user";

import './Login.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const history = useHistory();

    const onNameChange = e => {
      setName(e.target.value);
    };

    const onButtonClick = () => {
        if (!name)  {
            log(new Error('חובה להזין שם'));

            return;
        }

        setLoading(true);

        axios.post('/api/login', {user: name})
            .then(({data: user}) => {
                setUser(user);
                history.push('/');
            })
            .catch(log)
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            {getUser() && <Redirect to="/" />}
            <p>
                שלום יזם, איך השם?
            </p>
            <Box>
                <TextField variant="outlined" inputProps={{className: 'login-textbox'}} color='primary' onChange={onNameChange} />
            </Box>

            <p>
                <Button variant="contained" color="primary" onClick={onButtonClick}>כניסה</Button>
            </p>
            {loading && <SyncLoader color="#4A90E2" />}
        </>
    );
};

export default Login;
