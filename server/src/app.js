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

const clientPath = resolve(__dirname, '..', '..', 'client', 'dist');

app.use(bodyParser.json());
app.use(express.static(clientPath));

app.use('/api', apiRouter);

app.get('*', (req, res) => {
    res.sendFile(resolve(clientPath, 'index.html'));
});

app.use((error, req, res, next) => {
    console.log(error);

    res.status(error.status || 500).json({error: error.message});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
    initDb();
});
