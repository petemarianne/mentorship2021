import { Ad } from '../../src/interfaces';

export const comparator = (item1: Ad, item2: Ad, sort: any) => {
    if (item1.price === item2.price) {
        // @ts-ignore
        return item2.date - item1.date;
    }
    switch (sort) {
        case 'dateDown':
            // @ts-ignore
            return item2.date - item1.date;
        case 'dateUp':
            // @ts-ignore
            return item1.date - item2.date;
        case 'priceDown':
            return item2.price - item1.price;
        case 'priceUp':
            return item1.price - item2.price;
        default:
            // @ts-ignore
            return item2.date - item1.date;
    }
};
