import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
    try {
        const { email, password, name, phone, pic } = req.body;
    } catch (e) {
        return res.status(500);
    }
});

authRouter.post('/login', async (req, res) => {

});

export default authRouter;
