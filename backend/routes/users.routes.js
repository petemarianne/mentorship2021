import { Router } from 'express';
import { users } from '../data/users.js';
import jsonwebtoken from 'jsonwebtoken';
import config from 'config';

const usersRouter = Router();

usersRouter.get('/users/:id', async (req, res) => {
    try {
        const filteredUsers = users.filter(item => item.id === req.params.id);
        if (filteredUsers.length === 0) {
            return res.status(404);
        }
        return res.status(200).json(
            {
                avatar: filteredUsers[0].avatar,
                date: filteredUsers[0].date,
                email: filteredUsers[0].email,
                id: filteredUsers[0].id,
                name: filteredUsers[0].name,
                phone: filteredUsers[0].phone
            })
    } catch (e) {
        return res.status(500);
    }
});

usersRouter.get('/userinfo', async (req, res) => {
    try {
        if (req.headers['authorization']) {
            try {
                const parsedToken = jsonwebtoken.verify(req.headers['authorization'], config.get('jwtSecret'));
                const filteredUsers = users.filter(item => item.id === parsedToken.userID);
                if (filteredUsers.length === 0) {
                    return res.status(404);
                }
                return res.status(200).json(filteredUsers[0]);
            } catch (e) {
                return res.status(401).send('Invalid token');
            }
        } else {
            return res.status(401).send('Access forbidden');
        }
    } catch (e) {
        return res.status(500);
    }
});

export default usersRouter;
