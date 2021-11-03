import { Router } from 'express';
import { ads } from '../data/ads.js';

const adsRouter = Router();

const filterAds = (item, filter) => {
    if (item.status !== 'active') {
        return false;
    }
    let result = true;
    if (filter.breed !== '') {
        if (item.title.toLowerCase().indexOf(filter.breed.toLowerCase()) === -1 && item.description.toLowerCase().indexOf(filter.breed.toLowerCase()) === -1) {
            return false;
        } else {
            result = !!(item.title.toLowerCase().indexOf(filter.breed.toLowerCase()) || item.description.toLowerCase().indexOf(filter.breed.toLowerCase()));
        }
    }
    if (filter.country !== '') {
        result = result && filter.country.toLowerCase() === item.country.toLowerCase();
    }
    if (filter.city !== '') {
        result = result && filter.city.toLowerCase() === item.city.toLowerCase();
    }
    if (filter.pricefrom !== '') {
        result = result && Number(filter.priceFrom) <= Number(item.price);
    }
    if (filter.priceto !== '') {
        result = result && Number(filter.priceTo) >= Number(item.price);
    }
    return result;
};

const comparator = (item1, item2, sort) => {
    if (item1.price === item2.price) {
        return item2.date.seconds - item1.date.seconds;
    }
    switch (sort) {
        case 'dateDown':
            return item2.date.seconds - item1.date.seconds;
        case 'dateUp':
            return item1.date.seconds - item2.date.seconds;
        case 'priceDown':
            return item2.price - item1.price;
        case 'priceUp':
            return item1.price - item2.price;
        default:
            return item2.date.seconds - item1.date.seconds;
    }
}

adsRouter.get('/getads', async (req, res) => {
    try {
        const filteredAds = ads.filter(item => filterAds(item, req.headers)).sort((item1, item2) => comparator(item1, item2, req.headers.sort));
        return res.status(200).json([...filteredAds]);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

export default adsRouter;
