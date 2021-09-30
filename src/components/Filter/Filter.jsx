import React, { useContext, useState } from 'react';
import './Filter.scss';
import { Button, InputBase } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FilterContext } from '../../contexts/filter-context';

const Filter = (props) => {
    const {filter, handleFilter} = useContext(FilterContext);

    const [localFilter, setLocalFilter] = useState(filter);

    const handleCountry = (event) => {
        const cloneFilter = Object.assign({}, localFilter);
        setLocalFilter({
            breed: cloneFilter.breed,
            country: event.target.value,
            city: cloneFilter.city,
            priceFrom: cloneFilter.priceFrom,
            priceTo: cloneFilter.priceTo,
            sort: cloneFilter.sort
        });
    }

    const handleCity = (event) => {
        const cloneFilter = Object.assign({}, localFilter);
        setLocalFilter({
            breed: cloneFilter.breed,
            country: cloneFilter.country,
            city: event.target.value,
            priceFrom: cloneFilter.priceFrom,
            priceTo: cloneFilter.priceTo,
            sort: cloneFilter.sort
        });
    }

    const handlePriceFrom = (event) => {
        const cloneFilter = Object.assign({}, localFilter);
        setLocalFilter({
            breed: cloneFilter.breed,
            country: cloneFilter.country,
            city: cloneFilter.city,
            priceFrom: event.target.value,
            priceTo: cloneFilter.priceTo,
            sort: cloneFilter.sort
        });
    }

    const handlePriceTo = (event) => {
        const cloneFilter = Object.assign({}, localFilter);
        setLocalFilter({
            breed: cloneFilter.breed,
            country: cloneFilter.country,
            city: cloneFilter.city,
            priceFrom: cloneFilter.priceFrom,
            priceTo: event.target.value,
            sort: cloneFilter.sort
        });
    }

    const handleSelect = (event) => {
        const cloneFilter = Object.assign({}, localFilter);
        setLocalFilter({
            breed: cloneFilter.breed,
            country: cloneFilter.country,
            city: cloneFilter.city,
            priceFrom: cloneFilter.priceFrom,
            priceTo: cloneFilter.priceTo,
            sort: event.target.value
        });
    }

    const setFilter = () => {
        handleFilter(localFilter.country, localFilter.city, localFilter.priceFrom, localFilter.priceTo, localFilter.sort);
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            setFilter();
        }
    }

    const resetFilter = () => {
        setLocalFilter({
            breed: '',
            country: '',
            city: '',
            priceFrom: '',
            priceTo: '',
            sort: 'dateDown'
        });
        handleFilter('', '', '', '', 'dateDown', '');
    }
    return (
        <div className='filter-wrapper'>
            <div className='filter-name'>Country</div>
            {props.Divider}
            <div className='search large'>
                <InputBase id='countryInput' value={localFilter.country} onChange={handleCountry} onKeyDown={handleEnter} fullWidth/>
            </div>
            <div className='filter-name'>City</div>
            {props.Divider}
            <div className='search'>
                <InputBase value={localFilter.city} onChange={handleCity} onKeyDown={handleEnter} fullWidth/>
            </div>
            <div className='filter-name'>Price</div>
            {props.Divider}
            <div className={`price-filter ${props.desktopVersion}`}>
                <InputBase value={localFilter.priceFrom} onChange={handlePriceFrom} onKeyDown={handleEnter} className='price-search' fullWidth/>
                <InputBase value={localFilter.priceTo} onChange={handlePriceTo} onKeyDown={handleEnter} className='price-search' fullWidth/>
            </div>
            <InputBase className={`left-search ${props.mobileVersion}`} value={localFilter.priceFrom} onChange={handlePriceFrom} fullWidth/>
            <InputBase className={`right-search ${props.mobileVersion}`} value={localFilter.priceTo} onChange={handlePriceTo} fullWidth/>
            {props.Divider}
            <div className='filter-name'>Sort by</div>
            {props.Divider}
            <select className='filter-select' onChange={handleSelect} onKeyDown={handleEnter} value={localFilter.sort}>
                <option value='dateDown'>Date ↓</option>
                <option value='dateUp'>Date ↑</option>
                <option value='priceDown'>Price ↓</option>
                <option value='priceUp'>Price ↑</option>
            </select>
            {props.Divider}
            <div
                className='reset-filters'
                onClick={() => {
                    resetFilter();
                    props.handleDrawer();
                }}
            >Reset filters</div>
            <div className={`filter-button-wrapper ${props.desktopVersion}`}>
                <Button className='filter-button' variant='contained' color='primary' onClick={() => {setFilter();}}>Show result</Button>
            </div>
            <div className={`drawer-button-wrapper ${props.mobileVersion}`}>
                <Button className='submit-button' variant='contained' color='primary' onClick={() => {setFilter(); props.handleDrawer();}}>Show result</Button>
            </div>
        </div>
    )
}

Filter.propTypes = {
    handleDrawer: PropTypes.func,
    Divider: PropTypes.any,
    mobileVersion: PropTypes.string,
    desktopVersion: PropTypes.string,
};

export default Filter;
