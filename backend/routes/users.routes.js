import { Router } from 'express';
import { users } from '../data/users.js';

const usersRouter = Router();

usersRouter.get('/users/:id', async (req, res) => {
    try {
        const filteredUsers = users.filter(item => item.id === req.params.id);
        if (filteredUsers.length === 0) {
            return res.status(404);
        }
        return res.status(200).json(filteredUsers[0]);
    } catch (e) {
        res.status(500);
    }
});

usersRouter.put('/users/:id', async (req, res) => { //id 404!!!
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
                return res.status(500);
        }
    } catch (e) {
        res.status(500);
    }
});

export default usersRouter;
