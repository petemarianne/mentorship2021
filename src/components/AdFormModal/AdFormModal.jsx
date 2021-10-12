import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AdFormModal.scss';
import { Button, CircularProgress, IconButton, InputBase } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { app, db } from '../../firebase';
import { toDate } from '../../utils/toDate';
import { validateAd } from '../../utils/validateAd';
import { v4 as uuidv4 } from 'uuid';

export const AdFormModal = ({handleClose}) => {
    const [loading, setLoading] = useState(false);
    const [adsData, setAdsData] = useState([]);
    const [drag, setDrag] = useState(false);
    const [uploaded, setUploaded] = useState(false);
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
    const [loggedInUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')));

    const fetchAds = async () => {
        const adsCollection = await db.collection('dogAds').get();
        setAdsData(adsCollection.docs.map((doc) => {return doc.data();}));
    };

    useEffect(() => {
        fetchAds();
    }, []);

    const dragStartHandle = (event) => {
        event.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandle = (event) => {
        event.preventDefault();
        setDrag(false);
    }

    const onDropHandler = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFile(file);
        setDrag(false);
        setUploaded(true);
    }

    const onFileChange = async (event) => {
        const file = event.target.files[0];
        setFile(file);
        setDrag(false);
        setUploaded(true);
    };

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
            sellerID: loggedInUser.id,
            id: 'id' + (adsData.length + 1),
        });
        await db.collection('users').doc(loggedInUser.name).set({
            ...loggedInUser,
            activeAds: loggedInUser.activeAds + 1,
            date: toDate(loggedInUser.date),
        });
        localStorage.setItem('loggedInUser', JSON.stringify({
            ...loggedInUser,
            activeAds: loggedInUser.activeAds + 1,
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

    const uploadedJSX =
        <>
            <div>Uploaded!</div>
            <div className='file-name'>{file.name}</div>
            <Button variant='contained' color='primary' component='label' className='re-upload-file-button'>
                Upload Another File
                <input type='file' onChange={onFileChange} hidden/>
            </Button>
        </>;

    const dragJSX =
        <>
            <div>Drag a picture!</div>
            <div>or</div>
            <Button variant='contained' color='primary' component='label' className='upload-file-button'>
                Upload File
                <input type='file' onChange={onFileChange} hidden/>
            </Button>
        </>;

    const dropJSX = <div>Drop a picture!</div>;

    return (
        <div className='new-ad-modal'>
            <div className='close-icon-button-wrapper'>
                <IconButton aria-label='lose' size='medium' onClick={handleClose}>
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
            }}>
                <div className='filter-name'>Title</div>
                <div className='input'>
                    <InputBase value={fields.title} onChange={handleTitle} fullWidth/>
                </div>
                <div className='location-input'>
                    <div>
                        <div className='filter-name country'>Country</div>
                        <div className='input country'>
                            <InputBase value={fields.country} onChange={handleCountry} fullWidth/>
                        </div>
                    </div>
                    <div>
                        <div className='filter-name city'>City</div>
                        <div className='input city'>
                            <InputBase value={fields.city} onChange={handleCity} fullWidth/>
                        </div>
                    </div>
                </div>
                <div className='filter-name'>Description</div>
                <div className='input description'>
                    <InputBase value={fields.description} onChange={handleDescription} maxRows={7} multiline fullWidth/>
                </div>
                <div className='filter-name'>Price</div>
                <div className='price-input-picture-button-wrapper'>
                    <div className='price-input-button-wrapper'>
                        <div className='input price'>
                            <InputBase value={fields.price} onChange={handlePrice} fullWidth/>
                        </div>
                        {validate ? null : <div className='validate-attention'>Fill in all the fields!</div>}
                        <Button
                            type='submit'
                            className='publish-button'
                            variant='contained'
                            color='primary'
                        >
                            {!loading ? 'Publish' : <CircularProgress color='inherit' size='25px' />}
                        </Button>
                    </div>
                    <div onDragStart={dragStartHandle}
                         onDragLeave={dragLeaveHandle}
                         onDragOver={dragStartHandle}
                         onDrop={drag ? onDropHandler : null}
                         className='drag-and-drop-wrapper'
                         style={drag ? {padding: '55px 0'} : null}>
                        {drag ?  dropJSX : uploaded ? uploadedJSX : dragJSX}
                    </div>
                </div>
            </form>
        </div>
    );
};

AdFormModal.propTypes = {
    handleClose: PropTypes.func,
};
