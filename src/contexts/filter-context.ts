import React, { createContext } from 'react';
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
    setFilterState:  React.Dispatch<React.SetStateAction<Filter>>,
};

const defaultFilter: DefaultFilter = {
    filter: emptyFilter,
    setFilterState: () => {},
};

export const FilterContext = createContext(defaultFilter);
