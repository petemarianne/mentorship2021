import { Router } from 'express';
import { users } from '../data/users';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import config from 'config';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
    try {
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

        const token = jsonwebtoken.sign(
            {userID: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );

        return res.status(201).json({userID: user.id, token});
    } catch (e) {
        return res.status(500);
    }
});

authRouter.post('/login', (req, res) => {
        try {
            const {email, password} = req.body;

            const userIndex = users.findIndex(item => item.email === email);
            if (userIndex < 0) {
                return res.status(404).json({message: 'User is not found!'});
            }
            const isMatch = bcrypt.compare(password, users[userIndex].password as string);
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
