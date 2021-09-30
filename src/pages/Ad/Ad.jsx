import React from 'react';
import Layout from '../../components/Layout/Layout';
import {Button, useMediaQuery} from '@material-ui/core';
import './Ad.scss';

const Ad = () => {
    const screenSize = useMediaQuery('(min-width: 769px)');
    const ad = JSON.parse(localStorage.getItem('currentAd'));
    const user = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <Layout>
            {screenSize && (
                <div className='ad-page-desktop-wrapper'>
                    <div className='picture-info-seller-wrapper'>
                        <div className='pic-wrapper'><img src={ad.picture} alt={'Ad picture'}/></div>
                        <div className='info-wrapper'>
                            <div className='breed'>{ad.title}</div>
                            <div className='description'>{ad.description}</div>
                            <div className='price'>{ad.price}$</div>
                            <div className='location-date-wrapper'>
                                <div>{ad.city}, {ad.country}</div>
                                <div>{ad.date.seconds.toLocaleString('default', {day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric'}).toLowerCase()}</div>
                            </div>
                        </div>
                        <div className='buttons-seller-info-wrapper'>
                            <div className='call-button-wrapper'>
                                <Button color='primary' variant='contained' className='call-button'>Call</Button>
                            </div>
                            <div className='email-button-wrapper'>
                                <Button color='primary' variant='outlined' className='email-button'>Email</Button>
                            </div>
                            <div className='seller-info-wrapper'>
                                <div className='avatar-wrapper'><img src={user.avatar} alt='User avatar'/></div>
                                <div className='info-wrapper'>
                                    <div className='username'>{user.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Ad;