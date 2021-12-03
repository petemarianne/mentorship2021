import { Router } from 'express';
import { filterAds } from '../utils/filterAds';
import { comparator } from '../utils/comparatorAds';
import jsonwebtoken, { UserIDJwtPayload } from 'jsonwebtoken';
import config from 'config';
import Ad from '../models/Ad';
import User from '../models/User';

const adsRouter = Router();

adsRouter.get('/ads', async (req, res) => {
    try {
        if (req.query.sellerID) {
            Ad.find({sellerID: req.query.sellerID}, (err, ads) => {
                const filteredAds = ads.sort((item1, item2) => comparator(item1, item2, 'dateDown'));
                return res.status(200).json(filteredAds);
            });
        } else {
            Ad.find({}, (err, ads) => {
                const filteredAds = ads.filter(item => filterAds(item, req.query)).sort((item1, item2) => comparator(item1, item2, req.query.sort));
                return res.status(200).json(filteredAds);
            });
        }
    } catch (e) {
        return res.status(500);
    }
});

adsRouter.get('/ads/:id', async (req, res) => {
    try {
        const ad = await Ad.findOne({_id: req.params.id});
        if (!ad) {
            return res.status(404);
        }
        return res.status(200).json(ad);
    } catch (e) {
        return res.status(500);
    }
});

adsRouter.post('/ads', async (req, res) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(401).send('Access revoked!');
        }
        try {
            const parsedToken = <UserIDJwtPayload>jsonwebtoken.verify(req.headers['authorization'], config.get('jwtSecret'));
            const user = await User.findOne({_id: parsedToken.userID});
            if (!user) {
                return res.status(403).send('Invalid token');
            }

            const ad = new Ad({
                ...req.body,
                sellerID: parsedToken.userID
            });

            await ad.save();

            return res.status(201).json({
                title: req.body.title,
                country: req.body.country,
                city: req.body.city,
                description: req.body.description,
                price: req.body.price,
                date: Date.now(),
                status: 'active',
                sellerID: parsedToken.userID
            });
        } catch (e) {
            return res.status(401).send('Invalid token');
        }
    } catch (e) {
        return res.status(500);
    }
});

adsRouter.put('/ads/:id', async (req, res) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(401).send('Access revoked!');
        }
        try {
            const parsedToken = <UserIDJwtPayload>jsonwebtoken.verify(req.headers['authorization'], config.get('jwtSecret'));
            const ad = await Ad.findOne({_id: req.params.id});
            if (!ad) {
                return res.status(404);
            }
            if (ad.sellerID.toString() !== parsedToken.userID) {
                return res.status(403).send('Invalid token');
            }
            if (req.body.status) {
                switch (req.body.status) {
                    case 'closed':
                        Ad.findByIdAndUpdate({_id: req.params.id}, {
                            status: 'closed',
                            saleDate: null,
                            closingDate: Date.now()
                        })
                            .then(() => Ad.findOne({_id: req.params.id}))
                            .then(() => res.status(200).json({status: 'closed'}));
                        break;
                    case 'active':
                        Ad.findByIdAndUpdate({_id: req.params.id}, {
                            status: 'active',
                            date: Date.now(),
                            saleDate: null,
                            closingDate: null
                        })
                            .then(() => Ad.findOne({_id: req.params.id}))
                            .then(() => res.status(200).json({status: 'active'}));
                        break;
                    case 'sold':
                        Ad.findByIdAndUpdate({_id: req.params.id}, {
                            status: 'sold',
                            saleDate: Date.now(),
                            closingDate: null,
                        })
                            .then(() => Ad.findOne({_id: req.params.id}))
                            .then(() => res.status(200).json({status: 'sold'}));
                        break;
                    default:
                        return res.status(500);
                }
            } else {
                Ad.findByIdAndUpdate({_id: req.params.id}, {...req.body, date: Date.now()})
                    .then(() => Ad.findOne({_id: req.params.id}))
                    .then(() => res.status(200).json({...req.body, id: req.params.id}));
            }
        } catch (e) {
            return res.status(401).send('Invalid token');
        }
    } catch (e) {
        return res.status(500);
    }
});

export default adsRouter;
