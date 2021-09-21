import { COUNTRY_FILTER } from './actionTypes';

export const countryFilter = (country) => {
    return { type: COUNTRY_FILTER, country };
};