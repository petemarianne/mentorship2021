import { Router } from 'express';
import { users } from '../data/users';

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

export default usersRouter;
