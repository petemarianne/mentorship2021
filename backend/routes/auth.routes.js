import { Router } from 'express';
import {check, validationResult} from 'express-validator';
import { users } from '../data/users.js';
import bcrypt from 'bcryptjs';

const authRouter = Router();

authRouter.post(
    '/register',
    [
       check('email', 'Invalid email').isEmail(),
        check('password', 'Password must be more than 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data!'
            });
        }

        const { email, password, name, phone, avatar } = req.body;

        const userIndex = users.findIndex(item => item.email === email);
        if (userIndex >= 0) {
            return res.status(400).json({message: 'This email is already used!'})
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = {
            email,
            password: hashedPassword,
            name,
            phone,
            avatar,
            date: {
                seconds: new Date().getTime() / 1000,
                nanoseconds: 0,
            },
            activeAds: 0,
            id: `seller${users.length + 1}`
        };

        users.push(user);

    } catch (e) {
        return res.status(500);
    }
});

authRouter.post('/login', async (req, res) => {

});

export default authRouter;
