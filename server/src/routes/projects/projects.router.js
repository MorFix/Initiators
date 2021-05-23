import express from 'express';
import userMiddleware from '../middlewares/user.middleware.js';
import {getAllProjects, fundProject} from './projects.logic.js';

const router = express.Router();

router.get('/', userMiddleware, (req, res) => {
    res.json(getAllProjects());
});

router.put('/:project', userMiddleware, (req, res) => {
    const amount = parseInt(req.query.amount) || 0;

    fundProject(req.params.project, req.user, amount);
    res.end();
});

export default router;
