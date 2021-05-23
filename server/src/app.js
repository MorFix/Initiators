import {resolve, dirname} from 'path';
import { fileURLToPath } from 'url';
import {config} from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import apiRouter from './routes/api.router.js';

import {initDb} from './services/db/seeder.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

config();

const app = express();

app.use(bodyParser.json());
app.use(express.static(resolve(__dirname, '..', '..', 'client', 'dist')));

app.use('/api', apiRouter);

app.use((req, res, next) => {
    try {
        next();
    } catch (err) {
        res.status(err.status || 500)
            .json({error: err.message});
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
    initDb();
});
