import React, {useContext, useEffect, useState} from 'react';
import './Filter.scss';
import { Button, Divider, InputBase, useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FilterContext } from '../../contexts/filter-context';

const Filter = (props) => {
    const screenSize = useMediaQuery('(min-width: 769px)');

    const {filter, handleFilter} = useContext(FilterContext);

    const [localFilter, setLocalFilter] = useState({
        country: '',
        city: '',
        priceFrom: '',
        priceTo: '',
        sort: 'dateDown'
    })

    const handleCountry = (event) => {
        setLocalFilter({
            breed: '',
            country: event.target.value,
            city: '',
            priceFrom: '',
            priceTo: '',
            sort: 'dateDown'
        });
    }

    const handleCity = (event) => {
        setLocalFilter({city: event.target.value});
    }

    const handlePriceFrom = (event) => {
        setLocalFilter({priceFrom: event.target.value});
    }

    const handlePriceTo = (event) => {
        setLocalFilter({priceTo: event.target.value});
    }

    const handleSelect = (event) => {
        setLocalFilter({sort: event.target.value});
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
        <>
            {screenSize && (
                <div className='filter-wrapper'>
                    <div className='filter-name'>Country</div>
                    <div className='search large'>
                        <InputBase id='countryInput' value={localFilter.country} onChange={handleCountry} onKeyDown={handleEnter} fullWidth/>
                    </div>
                    <div className='filter-name'>City</div>
                    <div className='search'>
                        <InputBase value={localFilter.city} onChange={handleCity} onKeyDown={handleEnter} fullWidth/>
                    </div>
                    <div className='filter-name'>Price</div>
                    <div className='price-filter'>
                        <InputBase value={localFilter.priceFrom} onChange={handlePriceFrom} onKeyDown={handleEnter} className='price-search' fullWidth/>
                        <InputBase value={localFilter.priceTo} onChange={handlePriceTo} onKeyDown={handleEnter} className='price-search' fullWidth/>
                    </div>
                    <div className='filter-name'>Sort by</div>
                    <select className='filter-select' onChange={handleSelect} onKeyDown={handleEnter} value={localFilter.sort}>
                        <option value='dateDown'>Date ↓</option>
                        <option value='dateUp'>Date ↑</option>
                        <option value='priceDown'>Price ↓</option>
                        <option value='priceUp'>Price ↑</option>
                    </select>
                    <div
                        className='reset-filters'
                        onClick={() => {
                            resetFilter();
                        }}
                    >Reset filters</div>
                    <div className='filter-button-wrapper'>
                        <Button className='filter-button' variant='contained' color='primary' onClick={() => {setFilter();}}>Show result</Button>
                    </div>
                </div>
            )}
            {!screenSize && (
                <>
                    <div className='filter-name'>Country</div>
                    <Divider style={{backgroundColor: 'transparent'}} />
                    <div className='search large'>
                    <InputBase value={localFilter.country} onChange={handleCountry} fullWidth/>
                    </div>
                    <div className='filter-name'>City</div>
                    <Divider style={{backgroundColor: 'transparent'}} />
                    <div className='search'>
                    <InputBase value={localFilter.city} onChange={handleCity} fullWidth/>
                    </div>
                    <div className='filter-name'>Price</div>
                    <Divider style={{backgroundColor: 'transparent'}} />
                    <InputBase className='left-search' value={localFilter.priceFrom} onChange={handlePriceFrom} fullWidth/>
                    <InputBase className='right-search' value={localFilter.priceTo} onChange={handlePriceTo} fullWidth/>
                    <Divider style={{backgroundColor: 'transparent'}} />
                    <div className='filter-name'>Sort by</div>
                    <Divider style={{backgroundColor: 'transparent'}} />
                    <select className='filter-select' onChange={handleSelect} value={localFilter.sort}>
                    <option value='dateDown'>Date ↓</option>
                    <option value='dateUp'>Date ↑</option>
                    <option value='priceDown'>Price ↓</option>
                    <option value='priceUp'>Price ↑</option>
                    </select>
                    <Divider style={{backgroundColor: 'transparent'}} />
                    <div
                        className='reset-filters'
                        onClick={() => {
                            resetFilter();
                            props.handleDrawer();
                        }}
                    >Reset filters</div>
                    <Divider style={{backgroundColor: 'transparent'}} />
                    <div className='drawer-button-wrapper'>
                    <Button className='submit-button' variant='contained' color='primary' onClick={() => {setFilter(); props.handleDrawer();}}>Show result</Button>
                    </div>
                </>
            )}
        </>
    )
}

Filter.propTypes = {
    handleDrawer: PropTypes.func,
    handleCountry: PropTypes.func
};

export default Filter;
