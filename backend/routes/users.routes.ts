import { Router } from 'express';
import { users } from '../data/users';
import jsonwebtoken, { UserIDJwtPayload } from 'jsonwebtoken';
import config from 'config';

const usersRouter = Router();

usersRouter.get('/users/:id', async (req, res) => {
    try {
        if (req.headers['authorization']) {
            try {
                const parsedToken = <UserIDJwtPayload>jsonwebtoken.verify(req.headers['authorization'], config.get('jwtSecret'));
                if (parsedToken.userID !== req.params.id) {
                    return res.status(403).send('Invalid token');
                }
            } catch (e) {
                return res.status(401).send('Invalid token');
            }
        }
        const filteredUsers = users.filter(item => item.id === req.params.id);
        if (filteredUsers.length === 0) {
            return res.status(404);
        }
        return res.status(200).json(filteredUsers[0]);
    } catch (e) {
        return res.status(500);
    }
});

export default usersRouter;
