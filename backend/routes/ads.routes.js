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
        const filteredAds = ads.filter(item => item.id.substring(2) === req.params.id);
        if (filteredAds.length === 0) {
            return res.status(404);
        }
        return res.status(200).json(filteredAds[0]);
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
        const adIndex = ads.findIndex(item => item.id === req.params.id);
        if (adIndex < 0) {
            return res.status(404);
        }
        switch (req.body.status) {
            case 'closed':
                ads[adIndex].status = 'closed';
                ads[adIndex].saleDate = null;
                ads[adIndex].closingDate = {
                    seconds: new Date().getTime() / 1000,
                    nanoseconds: 0,
                };
                return res.status(200).json({status: 'closed'});
            case 'active':
                ads[adIndex].status = 'active';
                ads[adIndex].saleDate = null;
                ads[adIndex].closingDate = null;
                return res.status(200).json({status: 'active'});
            case 'sold':
                ads[adIndex].status = 'sold';
                ads[adIndex].saleDate = {
                    seconds: new Date().getTime() / 1000,
                    nanoseconds: 0,
                };
                ads[adIndex].closingDate = null;
                return res.status(200).json({status: 'sold'});
            default:
                return res.status(500);
        }
    } catch (e) {
        res.status(500);
    }
});

export default adsRouter;
