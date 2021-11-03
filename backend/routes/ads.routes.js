import { Router } from 'express';
import { ads } from '../data/ads.js';
import { filterAds } from '../utils/filterAds.js';
import { comparator } from '../utils/comparatorAds.js';

const adsRouter = Router();

adsRouter.get('/getads', async (req, res) => {
    try {
        const filteredAds = ads.filter(item => filterAds(item, req.headers)).sort((item1, item2) => comparator(item1, item2, req.headers.sort));
        return res.status(200).json([...filteredAds]);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

export default adsRouter;
