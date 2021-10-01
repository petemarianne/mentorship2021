import { createContext } from 'react';

export const filter = {
    breed: '',
    country: '',
    city: '',
    priceFrom: '',
    priceTo: '',
    sort: 'dateDown'
};

export const FilterContext = createContext({filter, setFilterState: () => {}});
