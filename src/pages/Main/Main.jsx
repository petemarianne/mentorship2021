import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../components/Layout/Layout';
import './Main.scss';
import {useMediaQuery, CircularProgress, Button} from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { app } from '../../firebase';
import Filter from '../../components/Filter/Filter'
import { FilterContext } from '../../contexts/filter-context'

const Main = () => {
    const db = app.firestore();

    const [adsData, setAdsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    let {filter, handleFilter} = useContext(FilterContext);

    const fetchAds = async () => {
        const adsCollection = await db.collection('dogAds').get();
        setAdsData(adsCollection.docs.map((doc) => {return doc.data();}));
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            fetchAds();
            setLoading(false);
        }, 1000)
    }, []);

    const screenSize = useMediaQuery('(min-width: 769px)');

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

    const handleChange = (event, value) => {
        setPage(value);
    };

    const filterArray = (item) => {
        let result = true;
        if (filter.breed !== '') {
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
                <Link to='/ad' style={{ textDecoration: 'none', color: 'black'}} key={index} className={loading ? 'ad-wrapper none' : 'ad-wrapper'}>
                    <div className='pic-wrapper'><img src={item.picture} alt='dog'/></div>
                    <div className='info-wrapper'>
                        <div className='breed'>{item.title}</div>
                        <div className='description'>{item.description}</div>
                        <div className='price'>{item.price}$</div>
                        <div className='location-date-wrapper'>
                            <div>{item.city}, {item.country}</div>
                            <div>{item.date.toDate().toLocaleString('default', {day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric'}).toLowerCase()}</div>
                        </div>
                    </div>
                </Link>
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
                className={filteredArray.length <= 10 || loading ? 'pagination-wrapper none' : 'pagination-wrapper'}/>
        </Stack>;

    const nothingWasFound = <div className={filteredArray.length === 0 ? 'nothing-found' : 'nothing-found none'}>Nothing was found for your search!</div>;

    const loadingJSX = <div className='loading-wrapper'><CircularProgress className={loading ? 'loading' : 'loading done'}/></div>;

    return (
        <Layout>
            {screenSize && (
                <div className='main-page-desktop-wrapper'>
                    <Filter />
                    <div className='feed-wrapper'>
                        {loadingJSX}
                        {nothingWasFound}
                        {adWrapper}
                        {pagination}
                    </div>
                </div>
            )}
            {!screenSize && (
                <div className='main-page-mobile-wrapper'>
                    {loadingJSX}
                    {nothingWasFound}
                    {adWrapper}
                    {pagination}
                </div>
            )}
        </Layout>
    );
};

export default Main;
