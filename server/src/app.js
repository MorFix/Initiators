import {resolve, dirname} from 'path';
import { fileURLToPath } from 'url';
import {config} from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import {getUser, login} from './coins.logic.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

config();

const app = express();

app.use(bodyParser.json());
app.use(express.static(resolve(__dirname, '..', '..', 'client', 'dist')));

const userMiddleware = (req, res, next) => {
    if (!req.query.user) {
        res.sendStatus(400);

        return;
    }

    const user = getUser(req.query.user);
    if (!user) {
        res.sendStatus(401);

        return;
    }

    req.user = user;

    next();
};

app.get('/api/user', userMiddleware, (req, res) => {
    res.json(req.user);
});

app.post('/api/login', (req, res) => {
    res.json(login(req.body.user));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
