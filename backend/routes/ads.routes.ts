import { Router } from 'express';
import { ads } from '../data/ads';
import { filterAds } from '../utils/filterAds';
import { comparator } from '../utils/comparatorAds';
import jsonwebtoken, { UserIDJwtPayload } from 'jsonwebtoken';
import config from 'config';
import { users } from '../data/users';

const adsRouter = Router();

adsRouter.get('/ads', (req, res) => {
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
        return res.status(500);
    }
});

adsRouter.get('/ads/:id', (req, res) => {
    try {
        const filteredAds = ads.filter(item => item.id.substring(2) === req.params.id);
        if (filteredAds.length === 0) {
            return res.status(404);
        }
        return res.status(200).json(filteredAds[0]);
    } catch (e) {
        return res.status(500);
    }
});

adsRouter.post('/ads', (req, res) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(401).send('Access revoked!');
        }
        try {
            const parsedToken = <UserIDJwtPayload>jsonwebtoken.verify(req.headers['authorization'], config.get('jwtSecret'));
            const userIndex = users.findIndex(item => item.id === parsedToken.userID);
            if (userIndex < 0) {
                return res.status(403).send('Invalid token');
            }
            ads.push({...req.body, id: `ad${ads.length + 1}`, sellerID: parsedToken.userID});
            return res.status(201);
        } catch (e) {
            return res.status(401).send('Invalid token');
        }
    } catch (e) {
        return res.status(500);
    }
});

adsRouter.put('/ads/:id', (req, res) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(401).send('Access revoked!');
        }
        try {
            const parsedToken = <UserIDJwtPayload>jsonwebtoken.verify(req.headers['authorization'], config.get('jwtSecret'));
            const adIndex = ads.findIndex(item => item.id === req.params.id);
            if (adIndex < 0) {
                return res.status(404);
            }
            if (ads[adIndex].sellerID !== parsedToken.userID) {
                return res.status(403).send('Invalid token');
            }
            switch (req.body.status) {
                case 'closed':
                    ads[adIndex].status = 'closed';
                    ads[adIndex].saleDate = undefined;
                    ads[adIndex].closingDate = {
                        seconds: new Date().getTime() / 1000,
                        nanoseconds: 0,
                    };
                    return res.status(200).json({status: 'closed'});
                case 'active':
                    ads[adIndex].status = 'active';
                    ads[adIndex].saleDate = undefined;
                    ads[adIndex].closingDate = undefined;
                    return res.status(200).json({status: 'active'});
                case 'sold':
                    ads[adIndex].status = 'sold';
                    ads[adIndex].saleDate = {
                        seconds: new Date().getTime() / 1000,
                        nanoseconds: 0,
                    };
                    ads[adIndex].closingDate = undefined;
                    return res.status(200).json({status: 'sold'});
                default:
                    return res.status(500);
            }
        } catch (e) {
            return res.status(401).send('Invalid token');
        }
    } catch (e) {
        return res.status(500);
    }
});

export default adsRouter;
