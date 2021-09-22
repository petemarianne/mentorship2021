import { PRICE_TO_FILTER } from './actionTypes';

export const priceToFilter = (priceTo) => {
    return {type: PRICE_TO_FILTER, priceTo};
};
