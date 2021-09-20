import React from 'react';
import Layout from '../../components/Layout/Layout';
import './Main.scss';
import { Button, InputBase, useMediaQuery } from "@material-ui/core";
import { adsData } from '../../ads-data/ads-data';

const Main = () => {
    const screenSize = useMediaQuery('(min-width: 769px)');

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
                        <select className='filter-select'>
                            <option>Date ↓</option>
                            <option>Date ↑</option>
                            <option>Price ↓</option>
                            <option>Price ↑</option>
                        </select>
                        <div className='filter-button-wrapper'>
                            <Button className='filter-button' variant='contained' color='primary'>Show result</Button>
                        </div>
                    </div>
                    <div className='feed-wrapper'>
                        {adsData.map((item) => {
                            return (
                                <div className='ad-wrapper'>
                                    <div className='pic-wrapper'><img src={item.picture} alt={'Ad picture'}/></div>
                                    <div className='info-wrapper'>
                                        <div className='breed'>{item.title}</div>
                                        <div className='description'>{item.description}</div>
                                        <div className='price'>{item.price}</div>
                                        <div className='location'>{item.city}, {item.country}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Main;