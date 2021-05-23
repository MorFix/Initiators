import express from 'express';
import userMiddleware from '../middlewares/user.middleware.js';

const router = express.Router();

router.get('/', userMiddleware, (req, res) => {
    res.json(req.user);
});

export default router;
