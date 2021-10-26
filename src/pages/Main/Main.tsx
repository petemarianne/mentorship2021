import React, { useState, useEffect, useContext } from 'react';
import './Main.scss';
import { CircularProgress } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import Filter from '../../components/Filter/Filter';
import { FilterContext } from '../../contexts/filter-context';
import { filterAds } from '../../utils/filterAds';
import { useScreenSize } from '../../hooks/useScreenSize';
import { Ad } from '../../interfaces/Ad';
import { toDate } from '../../utils/toDate';

const Main: React.FC = (): JSX.Element => {
    const [adsData, setAdsData] = useState<Ad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const {filter, setFilterState} = useContext(FilterContext);

    const fetchAds = async (): Promise<Ad[]> => {
        const adsCollection = await db.collection('dogAds').get();
        return adsCollection.docs.map((doc) => {return {
            id: doc.data().id,
            title: doc.data().title,
            description: doc.data().description,
            city: doc.data().city,
            country: doc.data().country,
            date: doc.data().date,
            picture: doc.data().picture,
            sellerID: doc.data().sellerID,
            status: doc.data().status,
            price: doc.data().price,
        };});
    };

    const {desktop} = useScreenSize();

    const comparator = (item1: Ad, item2: Ad): number => {
        if (item1.price === item2.price) {
            return item2.date.seconds - item1.date.seconds;
        }
        switch (filter.sort) {
            case 'dateDown':
                return item2.date.seconds - item1.date.seconds;
            case 'dateUp':
                return item1.date.seconds - item2.date.seconds;
            case 'priceDown':
                return item2.price - item1.price;
            case 'priceUp':
                return item1.price - item2.price;
            default:
                return item2.date.seconds - item1.date.seconds;
        }
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
        setPage(value);
    };

    const filteredArray: Ad[] = adsData.filter(item => filterAds(item, filter));
    const adWrapper: JSX.Element[] = filteredArray.sort(comparator).map((item, index) => {
        if (index < filteredArray.length && index >= (page - 1) * 10 && index < page * 10) {
            return (
                <Link
                    to={`/ad${item.id.substring(2)}`}
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
                            <div>{toDate(item.date).toLocaleString('default', {day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric'}).toLowerCase()}</div>
                        </div>
                    </div>
                </Link>
            );
        } else {
            return <React.Fragment key={`empty${index}`}/>;
        }
    });

    const pagination: JSX.Element =
        <Stack spacing={2}>
            <Pagination
                count={filteredArray.length % 10 === 0 ? filteredArray.length / 10 : Math.trunc(filteredArray.length / 10) + 1}
                page={page}
                onChange={handleChange}
                onClick={() => {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }}
                className={filteredArray.length <= 10 || loading ? 'pagination-wrapper none' : 'pagination-wrapper'}/>
        </Stack>;

    const loadingJSX: JSX.Element = <div className='loading-wrapper'><CircularProgress className={loading ? 'loading' : 'loading done'}/></div>;

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('search') as string)) {
            const breed: string = JSON.parse(localStorage.getItem('search') as string).breed;
            setFilterState((currentFilter) => ({
                ...currentFilter,
                breed,
            }))
        }
        localStorage.setItem('search', JSON.stringify({breed: ''}));
        setLoading(true);
        fetchAds().then((response) => {
            setAdsData(response);
            setLoading(false);
        })
    }, [setFilterState]);

    useEffect(() => {
        setLoading(true);
        setPage(1);
        setTimeout(() => {
            setLoading(false);
        }, 1300)
    }, [filter]);

    return (
        <>
            {desktop && (
                <div className='main-page-desktop-wrapper'>
                    <Filter isMenu={false}/>
                    <div className='feed-wrapper'>
                        {loadingJSX}
                        {!loading && adsData.length !== 0 && filteredArray.length === 0 ? <div className={'nothing-found'}>Nothing was found for your search!</div> : <></>}
                        {adWrapper}
                        {pagination}
                    </div>
                </div>
            )}
            {!desktop && (
                <div className='main-page-mobile-wrapper'>
                    {loadingJSX}
                    {!loading && adsData.length !== 0 && filteredArray.length === 0 ? <div className={'nothing-found'}>Nothing was found for your search!</div> : <></>}
                    {adWrapper}
                    {pagination}
                </div>
            )}
        </>
    );
};

export default Main;
