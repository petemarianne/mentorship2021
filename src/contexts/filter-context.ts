import { createContext } from 'react';
import { Filter } from '../interfaces/Filter';

export const emptyFilter: Filter = {
    breed: '',
    country: '',
    city: '',
    priceFrom: '',
    priceTo: '',
    sort: 'dateDown',
};

interface DefaultFilter {
    filter: Filter,
    setFilterState: (filter: Filter) => void,
};

const defaultFilter: DefaultFilter = {
    filter: emptyFilter,
    setFilterState: () => {},
};

export const FilterContext = createContext(defaultFilter);
