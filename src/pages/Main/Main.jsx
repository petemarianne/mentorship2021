import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import './Main.scss';
import { Button, InputBase, useMediaQuery, CircularProgress } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { adsData } from '../../ads-data/ads-data';
import { useSelector } from 'react-redux';

const Main = () => {
    const breed = useSelector((state) => state.breed);
    const countryMobile = useSelector((state) => state.country);
    const cityMobile = useSelector((state) => state.city);
    const priceFromMobile = useSelector((state) => state.priceFrom);
    const priceToMobile = useSelector((state) => state.priceTo);
    const sortMobile = useSelector((state) => state.sort);

    const screenSize = useMediaQuery('(min-width: 769px)');

    const [page, setPage] = useState(1);
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [priceFrom, setPriceFrom] = useState('')
    const [priceTo, setPriceTo] = useState('')
    const [sort, setSort] = useState('dateDown')
    const [filter, setFilter] = useState({
        breed: '',
        country: '',
        city: '',
        priceFrom: '',
        priceTo: '',
        sort: 'dateDown'
    });

    useEffect(() => {
        if (screenSize) {
            setFilter({
                breed,
                country,
                city,
                priceFrom,
                priceTo,
                sort
            })
        } else {
            setFilter({
                breed,
                country: countryMobile,
                city: cityMobile,
                priceFrom: priceFromMobile,
                priceTo: priceToMobile,
                sort: sortMobile
            })
        }
    },[breed, countryMobile, cityMobile, priceFromMobile, priceToMobile, sortMobile]);

    const comparator = (item1, item2) => {
        if (item1.price === item2.price) {
            return item2.date - item1.date;
        }
        switch (filter.sort) {
            case 'dateDown':
                return item2.date - item1.date;
            case 'dateUp':
                return item1.date - item2.date;
            case 'priceDown':
                return item2.price - item1.price;
            case 'priceUp':
                return item1.price - item2.price;
            default:
                return item2.date - item1.date;
        }
    }

    const handleCountry = (event) => {
        setCountry(event.target.value);
    }

    const handleCity = (event) => {
        setCity(event.target.value);
    }

    const handlePriceFrom = (event) => {
        setPriceFrom(event.target.value);
    }

    const handlePriceTo = (event) => {
        setPriceTo(event.target.value);
    }

    const handleSelect = (event) => {
        setSort(event.target.value);
    }

    const handleFilter = () => {
        setFilter({
            breed,
            country,
            city,
            priceFrom,
            priceTo,
            sort
        });
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleFilter();
        }
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    const filterArray = (item) => {
        let result = true;
        if (filter.breed !== '' ) {
            if (item.title.toLowerCase().indexOf(filter.breed.toLowerCase()) === -1 && item.description.toLowerCase().indexOf(filter.breed.toLowerCase()) === -1) {
                return false;
            } else {
                result = item.title.toLowerCase().indexOf(filter.breed.toLowerCase()) || item.description.toLowerCase().indexOf(filter.breed.toLowerCase());
            }
        }
        if (filter.country !== '') {
            result = result && filter.country.toLowerCase() === item.country.toLowerCase();
        }
        if (filter.city !== '') {
            result = result && filter.city.toLowerCase() === item.city.toLowerCase();
        }
        if (filter.priceFrom !== '') {
            result = result && Number(filter.priceFrom) <= Number(item.price);
        }
        if (filter.priceTo !== '') {
            result = result && Number(filter.priceTo) >= Number(item.price);
        }
        return result;
    }

    const filteredArray = adsData.filter(item => filterArray(item));
    const adWrapper = filteredArray.sort(comparator).map((item, index) => {
        if (index >= (page - 1) * 10 && index < page * 10) {
            return (
                <div key={index} className='ad-wrapper'>
                    <div className='pic-wrapper'><img src={item.picture} alt='dog'/></div>
                    <div className='info-wrapper'>
                        <div className='breed'>{item.title}</div>
                        <div className='description'>{item.description}</div>
                        <div className='price'>{item.price}$</div>
                        <div className='location-date-wrapper'>
                            <div>{item.city}, {item.country}</div>
                            <div>{item.date.getDate()} {item.date.toLocaleString('default', {month: 'short'}).toLowerCase()}., {item.date.getHours()}:{item.date.getMinutes()}</div>
                        </div>
                    </div>
                </div>
            );
        }
    });

    const pagination =
        <Stack spacing={2}>
            <Pagination
                count={adsData.length % 10 === 0 ? adsData.length / 10 : Math.trunc(adsData.length % 10) + 1}
                page={page}
                onChange={handleChange}
                onClick={() => {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }}
                className={filteredArray.length <= 10 ? 'pagination-wrapper none' : 'pagination-wrapper'}/>
        </Stack>;

    const nothingWasFound = <div className={filteredArray.length === 0 ? 'nothing-found' : 'nothing-found none'}>Nothing was found for your search!</div>;

    return (
        <Layout>
            {screenSize && (
                <div className='main-page-desktop-wrapper'>
                    <div className='filter-wrapper'>
                        <div className='filter-name'>Country</div>
                        <div className='search large'>
                            <InputBase id='countryInput' value={country} onChange={handleCountry} onKeyDown={handleEnter} fullWidth/>
                        </div>
                        <div className='filter-name'>City</div>
                        <div className='search'>
                            <InputBase value={city} onChange={handleCity} onKeyDown={handleEnter} fullWidth/>
                        </div>
                        <div className='filter-name'>Price</div>
                        <div className='price-filter'>
                            <InputBase value={priceFrom} onChange={handlePriceFrom} onKeyDown={handleEnter} className='price-search' fullWidth/>
                            <InputBase value={priceTo} onChange={handlePriceTo} onKeyDown={handleEnter} className='price-search' fullWidth/>
                        </div>
                        <div className='filter-name'>Sort by</div>
                        <select className='filter-select' onChange={handleSelect} onKeyDown={handleEnter} value={sort}>
                            <option value='dateDown'>Date ↓</option>
                            <option value='dateUp'>Date ↑</option>
                            <option value='priceDown'>Price ↓</option>
                            <option value='priceUp'>Price ↑</option>
                        </select>
                        <div
                            className='reset-filters'
                            onClick={() => {
                                setFilter({
                                    breed,
                                    country: '',
                                    city: '',
                                    priceFrom: '',
                                    priceTo: '',
                                    sort: 'dateDown'
                                });
                                setCountry('');
                                setCity('');
                                setPriceFrom('');
                                setPriceTo('');
                                setSort('dateDown')
                            }}
                        >Reset filters</div>
                        <div className='filter-button-wrapper'>
                            <Button className='filter-button' variant='contained' color='primary' onClick={handleFilter}>Show result</Button>
                        </div>
                    </div>
                    <div className='feed-wrapper'>
                        {nothingWasFound}
                        {adWrapper}
                        {pagination}
                    </div>
                </div>
            )}
            {!screenSize && (
                <div className='main-page-mobile-wrapper'>
                    {nothingWasFound}
                    {adWrapper}
                    {pagination}
                </div>
            )}
        </Layout>
    );
};

export default Main;
