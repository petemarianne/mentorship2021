import { Router } from 'express';
import { users } from '../data/users.js';

const adsRouter = Router();

adsRouter.get('/getallads', async (req, res) => {
    try {
        const filteredAds = ads.filter(item => filterAds(item, req.headers)).sort((item1, item2) => comparator(item1, item2, req.headers.sort));
        return res.status(200).json([...filteredAds]);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

adsRouter.get('/getad', async (req, res) => {
    try {
        const ad = ads.filter(item => item.id.substring(2) === req.headers.id)[0];
        console.log(ad);
        return res.status(200).json(ad);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

export default usersRouter;
