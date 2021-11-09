import { Router } from 'express';
import { users } from '../data/users.js';

const usersRouter = Router();

usersRouter.get('/users/:id', async (req, res) => {
    try {
        const user = users.filter(item => item.id === req.params.id)[0];
        return res.status(200).json(user);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

usersRouter.put('/updateusersactiveads/:id', async (req, res) => {
    try {
        const userIndex = users.findIndex(item => item.id === req.params.id);
        if (req.body.action === 'add') {
            users[userIndex].activeAds++;
        } else {
            users[userIndex].activeAds--;
        }
        return res.status(200).json({message: 'User\'s info is updated'});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

export default usersRouter;
