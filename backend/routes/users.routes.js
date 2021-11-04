import { Router } from 'express';
import { users } from '../data/users.js';

const usersRouter = Router();

usersRouter.get('/getuser', async (req, res) => {
    try {
        const user = users.filter(item => item.id === req.query.id)[0];
        return res.status(200).json(user);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

export default usersRouter;
