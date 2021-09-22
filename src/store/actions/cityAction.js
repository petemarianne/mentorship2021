import { CITY_FILTER } from './actionTypes';

export const cityFilter = (city) => {
    return {type: CITY_FILTER, city};
};