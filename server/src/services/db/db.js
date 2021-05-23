import {resolve, dirname} from 'path';
import { fileURLToPath } from 'url';
import JSONdb from 'simple-json-db';

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new JSONdb(resolve(__dirname, '..', '..', 'db.json'));

const USERS_KEY = 'users';
const PROJECTS_KEY = 'projects';

const getOne = (key, id) => {
    const all = db.get(key);
    if (!all || !all[id]) {
        return;
    }

    return all[id];
};

const saveOne = (key, id, value, collectionDefaultValue = {}) => {
    let all = db.get(key);
    if (!all) {
        all = collectionDefaultValue;
    }

    all[id] = value;

    db.set(key, all);
};

export const getUsers = () => db.get(USERS_KEY);
export const getUser = userId => getOne(USERS_KEY, userId);
export const saveUser = (userId, user) => saveOne(USERS_KEY, userId, user);

export const getProjects = () => db.get(PROJECTS_KEY);
export const getProject = projectId => getOne(PROJECTS_KEY, projectId);
export const saveProject = (projectId, project) => saveOne(PROJECTS_KEY, projectId, project);
