import React, { useContext, useState } from 'react';
import './Filter.scss';
import { Button, InputBase } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FilterContext } from '../../contexts/filter-context';

const Filter = (props) => {
    const {filter, setFilterState} = useContext(FilterContext);

    const [localFilter, setLocalFilter] = useState(filter);

    const handleCountry = (event) => {
        setLocalFilter({...localFilter, country: event.target.value});
    }

    const handleCity = (event) => {
        setLocalFilter({...localFilter, city: event.target.value});
    }

    const handlePriceFrom = (event) => {
        setLocalFilter({...localFilter, priceFrom: event.target.value});
    }

    const handlePriceTo = (event) => {
        setLocalFilter({...localFilter, priceTo: event.target.value});
    }

    const handleSelect = (event) => {
        setLocalFilter({...localFilter, sort: event.target.value});
    }

    const setFilter = () => {
        setFilterState({...localFilter, breed: filter.breed});
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            setFilter();
        }
    }

    const resetFilter = () => {
        const emptyFilter = {
            breed: '',
            country: '',
            city: '',
            priceFrom: '',
            priceTo: '',
            sort: 'dateDown'
        };
        setLocalFilter(emptyFilter);
        setFilterState(emptyFilter);
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
            {!props.isMenu ?
                <div className='price-filter'>
                    <InputBase value={localFilter.priceFrom} onChange={handlePriceFrom} onKeyDown={handleEnter}
                               className='price-search' fullWidth/>
                    <InputBase value={localFilter.priceTo} onChange={handlePriceTo} onKeyDown={handleEnter}
                               className='price-search' fullWidth/>
                </div>
                :
                <>
                <InputBase className='left-search' value={localFilter.priceFrom} onChange={handlePriceFrom} fullWidth/>
                <InputBase className='right-search' value={localFilter.priceTo} onChange={handlePriceTo} fullWidth/>
                </>
            }
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
                    if (props.isMenu) {
                        props.handleDrawer();
                    }
                }}
            >Reset filters</div>
            {!props.isMenu ?
                <div className='filter-button-wrapper'>
                    <Button className='filter-button' variant='contained' color='primary' onClick={() => {setFilter();}}>Show result</Button>
                </div>
                :
                <div className='drawer-button-wrapper'>
                    <Button className='submit-button' variant='contained' color='primary' onClick={() => {setFilter(); props.handleDrawer();}}>Show result</Button>
                </div>
            }
        </div>
    )
}

Filter.propTypes = {
    handleDrawer: PropTypes.func,
    Divider: PropTypes.any,
    isMenu: PropTypes.bool,
};

export default Filter;
