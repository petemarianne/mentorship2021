import React, { useContext, useState } from 'react';
import './Filter.scss';
import { Button, InputBase } from '@material-ui/core';
import { emptyFilter, FilterContext } from '../../contexts/filter-context';
import { Filter as FilterInterface } from '../../interfaces/Filter';

interface FilterProps {
    handleDrawer?: (value: boolean) => void,
    Divider?: JSX.Element,
    isMenu: boolean,
};

const Filter: React.FC<FilterProps> = (props): JSX.Element => {
    const {filter, setFilterState} = useContext(FilterContext);

    const [localFilter, setLocalFilter] = useState<FilterInterface>(filter);

    const handleCountry = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLocalFilter(currentFilter => ({...currentFilter, country: event.target.value}));
    }

    const handleCity = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLocalFilter(currentFilter => ({...currentFilter, city: event.target.value}));
    }

    const handlePriceFrom = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLocalFilter(currentFilter => ({...currentFilter, priceFrom: event.target.value}));
    }

    const handlePriceTo = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLocalFilter(currentFilter => ({...currentFilter, priceTo: event.target.value}));
    }

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setLocalFilter(currentFilter => ({...currentFilter, sort: event.target.value}));
    }

    const setFilter = (): void => {
        setFilterState({...localFilter, breed: filter.breed});
    }

    const handleEnter = (event:  React.KeyboardEvent): void => {
        if (event.key === 'Enter') {
            setFilter();
        }
    }

    const resetFilter = (): void => {
        setLocalFilter({...emptyFilter, breed: filter.breed});
        setFilterState({...emptyFilter, breed: filter.breed});
    }

    return (
        <div className='filter-wrapper'>
            <div className='filter-name'>Country</div>
            {props.Divider}
            <div className='search large'>
                <InputBase
                    value={localFilter.country}
                    onChange={handleCountry}
                    onKeyDown={handleEnter}
                    fullWidth
                    data-testid='input-country'
                />
            </div>
            <div className='filter-name'>City</div>
            {props.Divider}
            <div className='search'>
                <InputBase
                    value={localFilter.city}
                    onChange={handleCity}
                    onKeyDown={handleEnter}
                    fullWidth
                    data-testid='input'
                />
            </div>
            <div className='filter-name'>Price</div>
            {props.Divider}
            {!props.isMenu ?
                <div className='price-filter'>
                    <InputBase
                        value={localFilter.priceFrom}
                        onChange={handlePriceFrom}
                        onKeyDown={handleEnter}
                        className='price-search'
                        fullWidth
                        data-testid='input'
                    />
                    <InputBase
                        value={localFilter.priceTo}
                        onChange={handlePriceTo}
                        onKeyDown={handleEnter}
                        className='price-search'
                        fullWidth
                        data-testid='input'
                    />
                </div>
                :
                <div className='price-filter-wrapper'>
                <InputBase
                    className='left-search'
                    value={localFilter.priceFrom}
                    onChange={handlePriceFrom}
                    fullWidth
                    data-testid='input'
                />
                <InputBase
                    className='right-search'
                    value={localFilter.priceTo}
                    onChange={handlePriceTo}
                    fullWidth
                    data-testid='input'
                />
                </div>
            }
            {props.Divider}
            <div className='filter-name'>Sort by</div>
            {props.Divider}
            <div className='filter-select-wrapper'>
                <select className='filter-select' onChange={handleSelect} onKeyDown={handleEnter} value={localFilter.sort} data-testid='select'>
                    <option value='dateDown' data-testid="val1">Date ↓</option>
                    <option value='dateUp' data-testid="val2">Date ↑</option>
                    <option value='priceDown' data-testid="val3">Price ↓</option>
                    <option value='priceUp' data-testid="val4">Price ↑</option>
                </select>
            </div>
            {props.Divider}
            <div
                className='reset-filters'
                onClick={() => {
                    resetFilter();
                    if (props.isMenu) {
                        props.handleDrawer!(false);
                    }
                }}
            >Reset filters</div>
            {!props.isMenu ?
                <div className='filter-button-wrapper'>
                    <Button className='filter-button' variant='contained' color='primary' onClick={() => {setFilter();}}>Show result</Button>
                </div>
                :
                <div className='drawer-button-wrapper'>
                    <Button className='submit-button' variant='contained' color='primary' onClick={() => {setFilter(); props.handleDrawer!(false);}}>Show result</Button>
                </div>
            }
        </div>
    )
}

export default Filter;
