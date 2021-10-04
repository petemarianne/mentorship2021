import { createContext } from 'react';

export const emptyFilter = {
    breed: '',
    country: '',
    city: '',
    priceFrom: '',
    priceTo: '',
    sort: 'dateDown'
};

export const FilterContext = createContext({filter: emptyFilter, setFilterState: () => {}});
