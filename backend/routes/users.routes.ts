import { Router } from 'express';
import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({id: req.params.id});
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

export default usersRouter;
