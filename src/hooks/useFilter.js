import { useState } from 'react';
import { filter } from '../contexts/filter-context'

const useFilter = () => {
    const [filterState, setFilterState] = useState(filter);

    const handleFilter = (country, city, priceFrom, priceTo, sort, breed = filterState.breed) => {
        setFilterState({
            breed,
            country,
            city,
            priceFrom,
            priceTo,
            sort,
        })
        console.log(filterState);
    }

    return {
        filterState,
        handleFilter
    }
}

export default useFilter;
