import { Router } from 'express';
import {check, validationResult} from 'express-validator';
import { users } from '../data/users.js';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import config from 'config';

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

        return res.status(201).json({...user});
    } catch (e) {
        return res.status(500);
    }
});

authRouter.post('/login',
    [
        check('email', 'Invalid email').normalizeEmail().isEmail(),
        check('password', 'Password must be more than 6 symbols').exists()
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

            const {email, password} = req.body;

            const userIndex = users.findIndex(item => item.email === email);
            if (userIndex >= 0) {
                return res.status(404).json({message: 'User is not found!'});
            }

            const isMatch = await bcrypt.compare(password, users[userIndex].password);
            if (!isMatch) {
                return res.status(400).json({message: 'Incorrect password!'});
            }

            const token = jsonwebtoken.sign(
                {userID: users[userIndex].id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            );

            return res.status(200).json({token, userID: users[userIndex].id});
        } catch (e) {
            return res.status(500);
        }
});

export default authRouter;
