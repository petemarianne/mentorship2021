import { Router } from 'express';
import { ads } from '../data/ads.js';
import { filterAds } from '../utils/filterAds.js';
import { comparator } from '../utils/comparatorAds.js';

const adsRouter = Router();

adsRouter.get('/getallads', async (req, res) => {
    try {
        return res.status(200).json([...ads]);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

adsRouter.get('/getfilteredads', async (req, res) => {
    try {
        const filteredAds = ads.filter(item => filterAds(item, req.query)).sort((item1, item2) => comparator(item1, item2, req.query.sort));
        return res.status(200).json([...filteredAds]);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

adsRouter.get('/getusersads', async (req, res) => {
    try {
        const ad = ads.filter(item => item.sellerID === req.query.sellerID);
        return res.status(200).json(ad);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

adsRouter.get('/getad', async (req, res) => {
    try {
        const ad = ads.filter(item => item.id.substring(2) === req.query.id)[0];
        return res.status(200).json(ad);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

adsRouter.post('/setadinfo', async (req, res) => {
    try {
        ads.push(req.body);
        return res.status(200).json({message: 'Your new ad is successfully added!'});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

adsRouter.put('/closead/:id', async (req, res) => {
    try {
        const adIndex = ads.findIndex(item => item.id === req.params.id);
        ads[adIndex].status = 'closed';
        ads[adIndex].saleDate = null;
        ads[adIndex].closingDate = {
            seconds: new Date().getTime() / 1000,
            nanoseconds: 0,
        };
        return res.status(200).json({message: 'The ad is closed!'});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

adsRouter.put('/activatead/:id', async (req, res) => {
    try {
        const adIndex = ads.findIndex(item => item.id === req.params.id);
        ads[adIndex].status = 'active';
        ads[adIndex].saleDate = null;
        ads[adIndex].closingDate = null;
        return res.status(200).json({message: 'The ad is active!'});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

adsRouter.put('/sellad/:id', async (req, res) => {
    try {
        const adIndex = ads.findIndex(item => item.id === req.params.id);
        ads[adIndex].status = 'sold';
        ads[adIndex].saleDate = {
            seconds: new Date().getTime() / 1000,
            nanoseconds: 0,
        };
        ads[adIndex].closingDate = null;
        return res.status(200).json({message: 'The ad is sold!'});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

export default adsRouter;
