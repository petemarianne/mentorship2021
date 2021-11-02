const { Router } = require('express');
const router = Router();

router.post('/posttest', async (req, res) => {
    try {
         const {message} = req.body;
         return res.status(200).json({message});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.get('/gettest', async (req, res) => {
    try {
        return res.status(200).json({message: 'test message'});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

module.exports = router;
