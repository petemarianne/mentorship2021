import { Ad } from '../../src/interfaces';

export const comparator = (item1: Ad, item2: Ad, sort: any) => {
    if (item1.price === item2.price) {
        return item2.date.valueOf() - item1.date.valueOf();
    }
    switch (sort) {
        case 'dateDown':
            return item2.date.valueOf() - item1.date.valueOf();
        case 'dateUp':
            return item1.date.valueOf() - item2.date.valueOf();
        case 'priceDown':
            return item2.price - item1.price;
        case 'priceUp':
            return item1.price - item2.price;
        default:
            return item2.date.valueOf() - item1.date.valueOf();
    }
};
