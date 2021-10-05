import React, { useState } from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
import './Ad.scss';

const Ad = () => {
    const screenSize = useMediaQuery('(min-width: 769px)');
    const [ad] = useState(JSON.parse(localStorage.getItem('currentAd')))
    const [user] = useState(JSON.parse(localStorage.getItem('currentUser')))

    return (
        <>
            {screenSize && (
                <div className='ad-page-desktop-wrapper'>
                    <div className='picture-info-seller-wrapper'>
                        <div className='pic-wrapper'><img src={ad.picture} alt={'Ad picture'}/></div>
                        <div className='info-wrapper'>
                            <div className='breed'>{ad.title}</div>
                            <div className='location'>{ad.city}, {ad.country}</div>
                            <div className='price'>{ad.price}$</div>
                            <div className='date'>published on {new Date(ad.date.seconds * 1000).toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}</div>
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
                                    <div className='ads-count'>Ads: {user.activeAds}</div>
                                    <div className='date'>On Dog Shop since {new Date(user.date.seconds * 1000).toLocaleString('default', {month: 'long',  year: 'numeric'})}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='description-wrapper'>
                        <div>Description</div>
                        <div className='description'>{ad.description}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Ad;