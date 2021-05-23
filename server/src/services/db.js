import {resolve, dirname} from 'path';
import { fileURLToPath } from 'url';
import JSONdb from 'simple-json-db';
import User from '../models/User.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new JSONdb(resolve(__dirname, '..', '..', 'db.json'));

const USERS_KEY = 'users';
const getUsers = () => db.get(USERS_KEY);
const saveUsers = users => db.set(USERS_KEY, users);

export const getUser = user => {
    const users = getUsers();
    if (!users || !users[user]) {
        return;
    }

    const userDb = users[user];

    return new User(userDb.name, userDb.coins);
};

export const saveUser = (userName, userData) => {
    let users = getUsers();
    if (!users) {
        users = {};
    }

    users[userName] = userData;

    saveUsers(users);
};
