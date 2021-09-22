import { PRICE_FROM_FILTER } from './actionTypes';

export const priceFromFilter = (priceFrom) => {
    return {type: PRICE_FROM_FILTER, priceFrom};
};
