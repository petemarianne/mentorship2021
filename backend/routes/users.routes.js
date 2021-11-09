import { Router } from 'express';
import { users } from '../data/users.js';

const usersRouter = Router();

usersRouter.get('/users/:id', async (req, res) => {
    try {
        const user = users.filter(item => item.id === req.params.id)[0];
        return res.status(200).json(user);
    } catch (e) {
        res.status(500);
    }
});

usersRouter.put('/users/:id', async (req, res) => {
    try {
        const userIndex = users.findIndex(item => item.id === req.params.id);
        switch (req.body.action) {
            case 'add':
                users[userIndex].activeAds++;
                return res.status(200).json({message: 'User\'s info is updated'});
            case 'remove':
                users[userIndex].activeAds--;
                return res.status(200).json({message: 'User\'s info is updated'});
            default:
                return res.status(404);
        }
    } catch (e) {
        res.status(500);
    }
});

export default usersRouter;
