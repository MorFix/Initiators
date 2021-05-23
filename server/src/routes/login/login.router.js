import express from 'express';
import {login} from '../user/user.logic.js';

const router = express.Router();

router.post('/', (req, res) => {
    res.json(login(req.body.user));
});

export default router;
