import React, { useState, useEffect, useContext } from 'react';
import './Main.scss';
import { CircularProgress } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import { FilterContext } from '../../contexts/filter-context';
import { useScreenSize } from '../../hooks';
import { Ad } from '../../interfaces';

export const Main: React.FC = (): JSX.Element => {
    const [adsData, setAdsData] = useState<Ad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const {filter, setFilterState} = useContext(FilterContext);

    const {desktop} = useScreenSize();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
        setPage(value);
    };

    const adWrapper = adsData.map((item, index) => {
        if (index < adsData.length && index >= (page - 1) * 10 && index < page * 10) {
            return (
                <Link
                    to={`/ad${item._id}`}
                    style={{ textDecoration: 'none', color: 'black'}}
                    key={index}
                    className={loading ? 'ad-wrapper none' : 'ad-wrapper'}
                >
                    <div className='pic-wrapper'><img src={item.picture} alt='dog'/></div>
                    <div className='info-wrapper'>
                        <div className='breed'>{item.title}</div>
                        <div className='description'>{item.description}</div>
                        <div className='price'>{item.price}$</div>
                        <div className='location-date-wrapper'>
                            <div>{item.city}, {item.country}</div>
                            <div>{new Date(item.date).toLocaleString('default', {day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric'}).toLowerCase()}</div>
                        </div>
                    </div>
                </Link>
            );
        } else {
            return <React.Fragment key={`empty${index}`}/>;
        }
    });

    const pagination =
        <Stack spacing={2}>
            <Pagination
                count={adsData.length % 10 === 0 ? adsData.length / 10 : Math.trunc(adsData.length / 10) + 1}
                page={page}
                onChange={handleChange}
                onClick={() => {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }}
                className={adsData.length <= 10 || loading ? 'pagination-wrapper none' : 'pagination-wrapper'}/>
        </Stack>;

    const loadingJSX = <div className='loading-wrapper'><CircularProgress className={loading ? 'loading' : 'loading done'}/></div>;

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('search') as string)) {
            const breed: string = JSON.parse(localStorage.getItem('search') as string).breed;
            setFilterState((currentFilter) => ({
                ...currentFilter,
                breed,
            }))
        }
        localStorage.setItem('search', JSON.stringify({breed: ''}));
    }, [setFilterState]);

    useEffect(() => {
        try {
            setLoading(true);
            setPage(1);
            fetch(`api/ads?breed=${filter.breed}&country=${filter.country}&city=${filter.city}&priceFrom=${filter.priceFrom}&priceTo=${filter.priceTo}&sort=${filter.sort}`).then(response => response.json()).then((data) => {
                    setAdsData(data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1300);
                });
        } catch (e) {
            console.log('Something went wrong')
        }
        //console.log(adsData[0]._id)
    }, [filter]);

    return (
        <>
            {desktop && (
                <div className='main-page-desktop-wrapper'>
                    <Filter />
                    <div className='feed-wrapper'>
                        {loadingJSX}
                        {!loading && adsData.length === 0 ? <div className={'nothing-found'}>Nothing was found for your search!</div> : <></>}
                        {adWrapper}
                        {pagination}
                    </div>
                </div>
            )}
            {!desktop && (
                <div className='main-page-mobile-wrapper'>
                    {loadingJSX}
                    {!loading && adsData.length === 0 ? <div className={'nothing-found'}>Nothing was found for your search!</div> : <></>}
                    {adWrapper}
                    {pagination}
                </div>
            )}
        </>
    );
};
