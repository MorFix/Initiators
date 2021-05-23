import {getSingleUser} from '../user/user.logic.js';

export default (req, res, next) => {
    if (!req.query.userId) {
        res.sendStatus(400);

        return;
    }

    const user = getSingleUser(req.query.userId);
    if (!user) {
        res.sendStatus(401);

        return;
    }

    req.user = user;

    next();
};
