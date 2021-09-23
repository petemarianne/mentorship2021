import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import './Main.scss';
import {Button, InputBase, useMediaQuery} from "@material-ui/core";
import { adsData } from '../../ads-data/ads-data';
import { Link } from "react-router-dom";

const Main = () => {
    const screenSize = useMediaQuery('(min-width: 769px)');
    const [selectedSort, setSelectedSort] = useState('dateDown');

    const comparator = (item1, item2) => {
        if (item1.price === item2.price) {
            return item2.date - item1.date;
        }
        switch (selectedSort) {
            case 'dateDown':
                return item2.date - item1.date;
            case 'dateUp':
                return item1.date - item2.date;
            case 'priceDown':
                return item2.price - item1.price;
            case 'priceUp':
                return item1.price - item2.price;
        }
    }

    const handleSelect = (event) => {
        setSelectedSort(event.target.value);
    }

    const adWrapper = adsData.sort(comparator).map((item) => {
        return (
            <Link className='ad-wrapper' to='/ad' style={{ textDecoration: 'none', color: 'black'}}>
                <div className='pic-wrapper'><img src={item.picture} alt={'Ad picture'}/></div>
                <div className='info-wrapper'>
                    <div className='breed'>{item.title}</div>
                    <div className='description'>{item.description}</div>
                    <div className='price'>{item.price}$</div>
                    <div className='location-date-wrapper'>
                        <div>{item.city}, {item.country}</div>
                        <div>{item.date.getDate()} {item.date.toLocaleString('default', { month: 'short' }).toLowerCase()}., {item.date.getHours()}:{item.date.getMinutes()}</div>
                    </div>
                </div>
            </Link>
        );
    });

    return (
        <Layout>
            {screenSize && (
                <div className='main-page-desktop-wrapper'>
                    <div className='filter-wrapper'>
                        <div className='filter-name'>Country</div>
                        <div className='search large'>
                            <InputBase fullWidth/>
                        </div>
                        <div className='filter-name'>City</div>
                        <div className='search'>
                            <InputBase fullWidth/>
                        </div>
                        <div className='filter-name'>Price</div>
                        <div className='price-filter'>
                            <InputBase className='price-search' fullWidth/>
                            <InputBase className='price-search' fullWidth/>
                        </div>
                        <div className='filter-name'>Sort by</div>
                        <select className='filter-select' onChange={handleSelect} value={selectedSort}>
                            <option value='dateDown'>Date ↓</option>
                            <option value='dateUp'>Date ↑</option>
                            <option value='priceDown'>Price ↓</option>
                            <option value='priceUp'>Price ↑</option>
                        </select>
                        <div className='filter-button-wrapper'>
                            <Button className='filter-button' variant='contained' color='primary'>Show result</Button>
                        </div>
                    </div>
                    <div className='feed-wrapper'>
                        {adWrapper}
                    </div>
                </div>
            )}
            {!screenSize && (
                <div className='main-page-mobile-wrapper'>
                    {adWrapper}
                </div>
            )}
        </Layout>
    );
};

export default Main;