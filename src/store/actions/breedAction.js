import { BREED_SEARCH } from './actionTypes';

export const breedSearch = (breed) => {
    //document.body.setAttribute('theme', theme);
    return { type: BREED_SEARCH, breed };
};
