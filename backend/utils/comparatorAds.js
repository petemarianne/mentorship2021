export const comparator = (item1, item2, sort) => {
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
};
