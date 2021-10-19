import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AdFormModal.scss';
import { Button, CircularProgress, IconButton, InputBase } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { app, db } from '../../firebase';
import { toDate } from '../../utils/toDate';
import { validateAd } from '../../utils/validateAd';
import { v4 as uuidv4 } from 'uuid';
import DrugAndDropArea from './DrugAndDropArea/DrugAndDropArea';

export const AdFormModal = ({handleClose}) => {
    const [loading, setLoading] = useState(false);
    const [adsData, setAdsData] = useState([]);
    const [user, setUser] = useState({});
    const [validate, setValidate] = useState(true);
    const [file, setFile] = useState({});
    const [fields, setFields] = useState(
        {
            title: '',
            country: '',
            city: '',
            description: '',
            price: '',
        }
    )

    const fetchAds = async () => {
        const adsCollection = await db.collection('dogAds').get();
        setAdsData(adsCollection.docs.map((doc) => {return doc.data();}));
    };

    const fetchUser = async () => {
        const usersCollection = await db.collection('users').where('id','==','seller1').get();
        setUser(usersCollection.docs.map((doc) => {return doc.data();})[0]);
    };

    useEffect(() => {
        fetchAds();
        fetchUser();
    }, []);

    const publish = async () => {
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const fileUrl = await fileRef.getDownloadURL();
        await db.collection('dogAds').doc(uuidv4()).set({
            ...fields,
            picture: fileUrl,
            date: new Date(),
            status: 'active',
            sellerID: user.id,
            id: 'ad' + (adsData.length + 1),
        });
        await db.collection('users').doc(user.name).set({
            ...user,
            activeAds: user.activeAds + 1,
            date: toDate(user.date),
        });
        localStorage.setItem('loggedInUser', JSON.stringify({
            ...user,
            activeAds: user.activeAds + 1,
        }));
        handleClose();
    };

    const handleTitle = (event) => {
        setFields(current => ({...current, title: event.target.value}));
    }

    const handleCountry = (event) => {
        setFields(current => ({...current, country: event.target.value}));
    }

    const handleCity = (event) => {
        setFields(current => ({...current, city: event.target.value}));
    }

    const handleDescription = (event) => {
        setFields(current => ({...current, description: event.target.value}));
    }

    const handlePrice = (event) => {
        setFields(current => ({...current, price: event.target.value}));
    }

    return (
        <div className='new-ad-modal'>
            <div className='close-icon-button-wrapper'>
                <IconButton id='modal-close-button' aria-label='lose' size='medium' onClick={handleClose} data-testid='close-button'>
                    <CloseIcon fontSize='medium'/>
                </IconButton>
            </div>
            <div className='modal-header'>NEW AD FORM</div>
            <form onSubmit={(event) => {
                event.preventDefault();
                if (validateAd(file, fields)) {
                    setLoading(true);
                    publish().then(() => {setLoading(false)});
                } else {
                    setValidate(false)
                }
            }} data-testid='form'>
                <div className='filter-name'>Title</div>
                <div className='input'>
                    <InputBase value={fields.title} onChange={handleTitle} data-testid='text-input' fullWidth/>
                </div>
                <div className='location-input'>
                    <div>
                        <div className='filter-name country'>Country</div>
                        <div className='input country'>
                            <InputBase value={fields.country} onChange={handleCountry} data-testid='text-input' fullWidth/>
                        </div>
                    </div>
                    <div>
                        <div className='filter-name city'>City</div>
                        <div className='input city'>
                            <InputBase value={fields.city} onChange={handleCity} data-testid='text-input' fullWidth/>
                        </div>
                    </div>
                </div>
                <div className='filter-name'>Description</div>
                <div className='input description'>
                    <InputBase value={fields.description} onChange={handleDescription} maxRows={7} data-testid='text-input' multiline fullWidth/>
                </div>
                <div className='filter-name'>Price</div>
                <div className='price-input-picture-button-wrapper'>
                    <div className='price-input-button-wrapper'>
                        <div className='input price'>
                            <InputBase value={fields.price} onChange={handlePrice} data-testid='text-input' fullWidth/>
                        </div>
                        {validate ? null : <div className='validate-attention' data-testid='validate'>Fill in all the fields!</div>}
                        <Button
                            type='submit'
                            className='publish-button'
                            variant='contained'
                            color='primary'
                            data-testid='publish-button'
                        >
                            {!loading ? 'Publish' : <CircularProgress color='inherit' size='25px' data-testid='loading'/>}
                        </Button>
                    </div>
                    <DrugAndDropArea file={file} setFile={setFile}/>
                </div>
            </form>
        </div>
    );
};

AdFormModal.propTypes = {
    handleClose: PropTypes.func,
};
