import {v4 as uuidv4} from 'uuid';
import {getUsers, getUser, saveUser} from '../../services/db/db.js';
import User from '../../models/User.js';

const createUser = userName => {
    const id = uuidv4();
    const userModel = new User(id, userName, 1000);

    saveUser(id, userModel);

    return userModel;
};

export const login = userName => {
    if (!userName) {
        throw new Error('חובה להזין שם');
    }

    let userModel = Object.values(getUsers() || {})
        .find(x => x.name === userName);

    if (!userModel) {
        userModel = createUser(userName);
    }

    return User.fromDb(userModel);
};

export const getSingleUser = userId => {
    const user = getUser(userId);
    if (user) {
        return User.fromDb(user);
    }
};
