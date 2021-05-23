import {getUser as getUserModel, saveUser} from './services/db.js';
import User from './models/User.js';

export const login = user => {
    let userModel = getUserModel(user);
    if (!userModel) {
        userModel = new User(user, 1000);

        saveUser(user, userModel);
    }

    return userModel;
};

export const getUser = getUserModel;
