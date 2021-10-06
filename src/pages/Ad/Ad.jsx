import React, { useState } from 'react';
import { Button, Modal } from '@material-ui/core';
import './Ad.scss';
import { toDate } from '../../utils/toDate';
import { useScreenSize } from '../../hooks/useScreenSize';

const Ad = () => {
    const {desktop, tablet, mobile} = useScreenSize();
    const [ad] = useState(JSON.parse(localStorage.getItem('currentAd')))
    const [user] = useState(JSON.parse(localStorage.getItem('currentUser')))
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const pictureJSX = <div className='pic-wrapper' onClick={handleOpen}><img src={ad.picture} alt={'Ad picture'}/></div>;

    const sellerInfoJSX =
            <div className='seller-info-wrapper'>
                <div className='avatar-wrapper'><img src={user.avatar} alt='User avatar'/></div>
                <div className='info-wrapper'>
                    <div className='username'>{user.name}</div>
                    <div className='ads-count'>Ads: {user.activeAds}</div>
                    <div className='date'>On Dog Shop since {toDate(user.date).toLocaleString('default', {month: 'long',  year: 'numeric'})}</div>
                </div>
            </div>;

    const buttonsJSX =
        <>
            <div className='call-button-wrapper'>
                <Button color='primary' variant='contained' className='call-button'>Call</Button>
            </div>
            <div className='email-button-wrapper'>
                <Button color='primary' variant='outlined' className='email-button'>Email</Button>
            </div>
        </>;

    return (
        <>
            {desktop && (
                <div className='ad-page-desktop-wrapper'>
                    <div className='picture-info-seller-wrapper'>
                        {pictureJSX}
                        <div className='info-wrapper'>
                            <div className='breed'>{ad.title}</div>
                            <div className='location'>{ad.city}, {ad.country}</div>
                            <div className='price'>{ad.price}$</div>
                            <div className='date'>published on {toDate(user.date).toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}</div>
                        </div>
                        <div className='buttons-seller-info-wrapper'>
                            {buttonsJSX}
                            {sellerInfoJSX}
                        </div>
                    </div>
                    <div className='description-wrapper'>
                        <div>Description</div>
                        <div className='description'>{ad.description}</div>
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby='simple-modal-title'
                        aria-describedby='simple-modal-description'
                        className='modal'>
                        <div className='modal-picture'>
                            {pictureJSX}
                        </div>
                    </Modal>
                </div>
            )}
            {!desktop && tablet && (
                <div className='ad-page-tablet-wrapper'>
                    <div className='pic-wrapper-wrapper'>{pictureJSX}</div>
                    <div className='info-wrapper'>
                        <div className='date'>{toDate(user.date).toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}</div>
                        <div className='breed-location-price-buttons-wrapper'>
                            <div className='breed-location-price-wrapper'>
                                <div className='breed'>{ad.title}</div>
                                <div className='location'>{ad.city}, {ad.country}</div>
                                <div className='price'>{ad.price}$</div>
                            </div>
                            <div className='buttons-wrapper'>
                                {buttonsJSX}
                            </div>
                        </div>
                        <div className='description-title'>Description</div>
                        <div className='description'>{ad.description}</div>
                        {sellerInfoJSX}
                    </div>
                </div>
            )}
            {mobile && (
                <div className='ad-page-mobile-wrapper'>
                    <div className='pic-wrapper-wrapper'>{pictureJSX}</div>
                    <div className='info-wrapper'>
                        <div className='date'>{toDate(user.date).toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}</div>
                        <div className='breed-location-price-wrapper'>
                            <div className='breed-location-wrapper'>
                                <div className='breed'>{ad.title}</div>
                                <div className='location'>{ad.city}, {ad.country}</div>
                            </div>
                            <div className='price'>{ad.price}$</div>
                        </div>
                        <div className='description-title'>Description</div>
                        <div className='description'>{ad.description}</div>
                        {buttonsJSX}
                        {sellerInfoJSX}
                    </div>
                </div>
            )}
        </>
    );
};

export default Ad;
