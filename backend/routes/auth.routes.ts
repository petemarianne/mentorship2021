import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import config from 'config';
import { check, validationResult } from 'express-validator';
import User from '../models/User';

const authRouter = Router();

authRouter.post(
    '/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password must be more than 6 symbols').isLength({min: 6})
    ],
    async (req: any, res: any) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid data!'
                });
            }

            const { email, password, name, phone, avatar } = req.body;

            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({message: 'This email is already used!'})
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                password: hashedPassword,
                name,
                phone,
                avatar,
            });

            await user.save();

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

authRouter.post('/login',
    [
        check('email', 'Invalid email').normalizeEmail().isEmail(),
        check('password', 'Password must be more than 6 symbols').exists()
    ],
    async (req: any, res: any) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({message: 'User is not found!'});
            }

            const isMatch = bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({message: 'Incorrect password!'});
            }

            const token = jsonwebtoken.sign(
                {userID: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            );
            return res.status(200).json({token, userID: user.id});
        } catch (e) {
            return res.status(500);
        }
});


export default authRouter;

