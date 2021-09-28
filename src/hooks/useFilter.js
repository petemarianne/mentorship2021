import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { countryFilter } from "../store/actions/countryAction";
import { cityFilter } from "../store/actions/cityAction";
import { priceFromFilter } from "../store/actions/priceFromAction";
import { priceToFilter } from "../store/actions/priceToAction";
import { sortFilter } from "../store/actions/sortAction";

const useFilter = () => {
    const dispatch = useDispatch();
    const breed = useSelector((state) => state.breed);
    const country = useSelector((state) => state.country);
    const city = useSelector((state) => state.city);
    const priceFrom = useSelector((state) => state.priceFrom);
    const priceTo = useSelector((state) => state.priceTo);
    const sort = useSelector((state) => state.sort);

    const [filter, setFilter] = useState({
        breed,
        country,
        city,
        priceFrom,
        priceTo,
        sort
    })

    const handleFilter = (co = country, ci = city, pF = priceFrom, pT = priceTo, so = sort) => {
        setFilter({
            breed,
            country: co,
            city: ci,
            priceFrom: pF,
            priceTo: pT,
            sort: so
        })
        dispatch(countryFilter(co));
        dispatch(cityFilter(ci));
        dispatch(priceFromFilter(pF));
        dispatch(priceToFilter(pT));
        dispatch(sortFilter(so));
    }

    useEffect(() => {
        handleFilter();
    },[breed, country, city, priceFrom, priceTo, sort]);

    return {
        filter,
        handleFilter
    }
}

export default useFilter;