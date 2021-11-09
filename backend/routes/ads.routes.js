import { Router } from 'express';
import { ads } from '../data/ads.js';
import { filterAds } from '../utils/filterAds.js';
import { comparator } from '../utils/comparatorAds.js';

const adsRouter = Router();

adsRouter.get('/ads', async (req, res) => {
    try {
        if (req.query.sellerID) {
            const ad = ads.filter(item => item.sellerID === req.query.sellerID);
            return res.status(200).json(ad);
        }
        if (req.query) {
            const filteredAds = ads.filter(item => filterAds(item, req.query)).sort((item1, item2) => comparator(item1, item2, req.query.sort));
            return res.status(200).json([...filteredAds]);
        }
        return res.status(200).json([...ads]);
    } catch (e) {
        res.status(500);
    }
});

adsRouter.get('/ads/:id', async (req, res) => {
    try {
        const ad = ads.filter(item => item.id.substring(2) === req.params.id)[0];
        return res.status(200).json(ad);
    } catch (e) {
        res.status(500);
    }
});

adsRouter.post('/ads', async (req, res) => {
    try {
        ads.push(req.body);
        return res.status(201);
    } catch (e) {
        res.status(500);
    }
});

adsRouter.put('/ads/:id', async (req, res) => {
    try {
        let adIndex;
        switch (req.body.action) {
            case 'close':
                adIndex = ads.findIndex(item => item.id === req.params.id);
                ads[adIndex].status = 'closed';
                ads[adIndex].saleDate = null;
                ads[adIndex].closingDate = {
                    seconds: new Date().getTime() / 1000,
                    nanoseconds: 0,
                };
                return res.status(204);
            case 'activate':
                adIndex = ads.findIndex(item => item.id === req.params.id);
                ads[adIndex].status = 'active';
                ads[adIndex].saleDate = null;
                ads[adIndex].closingDate = null;
                return res.status(204);
            case 'sell':
                adIndex = ads.findIndex(item => item.id === req.params.id);
                ads[adIndex].status = 'sold';
                ads[adIndex].saleDate = {
                    seconds: new Date().getTime() / 1000,
                    nanoseconds: 0,
                };
                ads[adIndex].closingDate = null;
                return res.status(204);
            default:
                return res.status(404);
        }
    } catch (e) {
        res.status(500);
    }
});

export default adsRouter;
