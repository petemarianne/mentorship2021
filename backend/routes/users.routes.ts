import { Router } from 'express';
import User from '../models/User';
import jsonwebtoken, { UserIDJwtPayload } from 'jsonwebtoken';
import config from 'config';

const usersRouter = Router();

usersRouter.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        if (!user) {
            return res.status(404);
        }
        return res.status(200).json(
            {
                avatar: user.avatar,
                date: user.date,
                email: user.email,
                id: user.id,
                name: user.name,
                phone: user.phone
            })
    } catch (e) {
        return res.status(500);
    }
});

usersRouter.put('/users/:id', async (req, res) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(401).send('Access revoked!');
        }
        try {
            const parsedToken = <UserIDJwtPayload>jsonwebtoken.verify(req.headers['authorization'], config.get('jwtSecret'));
            const user = await User.findOne({_id: req.params.id});
            if (!user) {
                return res.status(404);
            }
            if (user.id.toString() !== parsedToken.userID) {
                return res.status(403).send('Invalid token');
            }
            if (req.body) {
                User.findByIdAndUpdate({_id: req.params.id}, {...req.body})
                    .then(() => User.findOne({_id: req.params.id}))
                    .then(() => res.status(200).json({...req.body, id: req.params.id}));
            } else {
                return res.status(500);
            }
        } catch (e) {
            return res.status(401).send('Invalid token');
        }
    } catch (e) {
        return res.status(500);
    }
});


export default usersRouter;
