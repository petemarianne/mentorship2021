import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from '@material-ui/core';
import './Ad.scss';
import { useScreenSize } from '../../hooks';
import { Link, useParams } from 'react-router-dom';
import { User, Ad as AdInterface } from '../../interfaces';
import { AuthContext } from '../../contexts/auth-context';

export const Ad: React.FC = (): JSX.Element => {
    const {desktop, tablet, mobile} = useScreenSize();
    const [ad, setAd] = useState<AdInterface>({
        _id: '',
        title: '',
        description: '',
        city: '',
        country: '',
        date: new Date,
        picture: '',
        sellerID: '',
        status: '',
        price: 0,
    });
    const [user, setUser] = useState<User>({
        avatar: '',
        date: new Date,
        email: '',
        id: '',
        name: '',
        phone: '',
    });
    const [activeAds, setActiveAds] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const { id } = useParams<{id: string}>();

    const {sellerID} = useContext(AuthContext);

    useEffect(() => {
        fetch(`api/ads/${id}`)
            .then(response => response.json())
            .then((data) => {
                setAd(data);
                return fetch(`api/users/${data.sellerID}`)})
            .then(response => response.json())
            .then((data) => {
                setUser(data);
                return fetch(`api/ads?sellerID=${data.id}`);
            })
            .then(response => response.json())
            .then((data: AdInterface[]) => {
                const number = data.filter(item => item.status === 'active').length;
                setActiveAds(number);
            });
    }, []);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const pictureJSX = <div className='pic-wrapper' onClick={handleOpen}><img src={ad.picture} alt='ad'/></div>;

    const sellerInfoJSX =
            <Link className='seller-info-wrapper' to={ad.sellerID === sellerID ? '/myprofile' : `/profile${ad.sellerID}`} style={{ color: 'black', textDecoration: 'none' }}>
                <div className='avatar-wrapper'><img src={user.avatar} alt='User avatar'/></div>
                <div className='info-wrapper'>
                    <div className='username'>{user.name}</div>
                    <div className='ads-count'>Ads: {activeAds}</div>
                    <div className='date'>On Dog Shop since {new Date(user.date).toLocaleString('default', {month: 'long',  year: 'numeric'})}</div>
                </div>
            </Link>;

    const buttonsJSX =
        <>
            <a className='call-button-wrapper' href={`tel:${user.phone.substring(1)}`} style={{textDecoration: 'none'}}>
                <Button color='primary' variant='contained' className='call-button'>Call</Button>
            </a>
            <a className='email-button-wrapper' href={`mailto:${user.email}`} style={{textDecoration: 'none'}}>
                <Button color='primary' variant='outlined' className='email-button'>Email</Button>
            </a>
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
                            <div className='date'>published on {new Date(ad.date).toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}</div>
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
            {tablet && (
                <div className='ad-page-tablet-wrapper'>
                    <div className='pic-wrapper-wrapper'>{pictureJSX}</div>
                    <div className='info-wrapper'>
                        <div className='date'>{new Date(ad.date).toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}</div>
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
                        <div className='date'>{new Date(ad.date).toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})}</div>
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
