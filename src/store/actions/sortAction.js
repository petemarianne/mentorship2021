import { SORT_FILTER } from './actionTypes';

export const sortFilter = (sort) => {
    return {type: SORT_FILTER, sort};
};
