import { useState } from 'react';
import { filter } from '../contexts/filter-context'

const useFilter = () => {
    const [filterState, setFilterState] = useState(filter);

    return {
        filterState,
        setFilterState
    }
}

export default useFilter;
