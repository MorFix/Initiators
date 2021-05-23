import express from 'express';

import loginRouter from './login/login.router.js';
import userRouter from './user/user.router.js';
import projectsRouter from './projects/projects.router.js';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/projects', projectsRouter);

export default router;
