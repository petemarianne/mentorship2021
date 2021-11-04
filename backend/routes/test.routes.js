import { Router } from 'express';

const testRouter = Router();

testRouter.post('/posttest', async (req, res) => {
    try {
         const {message} = req.body;
         console.log(message);
         return res.status(200).json({message});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

testRouter.get('/gettest', async (req, res) => {
    try {
        return res.status(200).json({message: 'test message'});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

export default testRouter;
