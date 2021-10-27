import React, { useEffect, useState } from 'react';
import './AdFormModal.scss';
import { Button, CircularProgress, IconButton, InputBase } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { app, db } from '../../firebase';
import { toDate,  validateAd, fetchAds, fetchUser } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import { Ad, User, Fields } from '../../interfaces';
import firebase from 'firebase';

interface AdFormModalProps {
    handleClose: () => void,
};

const AdFormModal: React.FC<AdFormModalProps> = (props): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [adsData, setAdsData] = useState<Ad[]>([]);
    const [user, setUser] = useState<User>({
        activeAds: 0,
        avatar: '',
        date: {
            seconds: 0,
            nanoseconds: 0,
        },
        email: '',
        id: '',
        name: '',
        phone: '',
    });
    const [validate, setValidate] = useState<boolean>(true);
    const [file, setFile] = useState<File>();
    const [drag, setDrag] = useState<boolean>(false);
    const [uploaded, setUploaded] = useState<boolean>(false);
    const [fields, setFields] = useState<Fields>(
        {
            title: '',
            country: '',
            city: '',
            description: '',
            price: '',
        }
    )

    useEffect(() => {
        fetchAds().then((response) => {
            setAdsData(response);
        });
        fetchUser(1).then((response) => {
            setUser(response);
        });
    }, []);

    const dragStartHandle = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandle = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        setDrag(false);
    }

    const onDropHandler = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        const file: File = event.dataTransfer.files[0];
        setFile(file);
        setDrag(false);
        setUploaded(true);
    }

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const file: File | null = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFile(file);
            setDrag(false);
            setUploaded(true);
        }
    };

    const publish = async (): Promise<void> => {
        const storageRef: firebase.storage.Reference = app.storage().ref();
        const fileRef: firebase.storage.Reference = storageRef.child(file?.name as string);
        file && await fileRef.put(file);
        const fileUrl: string = await fileRef.getDownloadURL();
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
        props.handleClose();
    };

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, title: event.target.value}));
    };

    const handleCountry = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, country: event.target.value}));
    };

    const handleCity = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, city: event.target.value}));
    };

    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, description: event.target.value}));
    };

    const handlePrice = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, price: event.target.value}));
    };

    const uploadedJSX: JSX.Element =
        <>
            <div>Uploaded!</div>
            <div className='file-name'>{file?.name}</div>
            <Button variant='contained' color='primary' component='label' className='re-upload-file-button'>
                Upload Another File
                <input data-testid='upload-another-file' type='file' onChange={onFileChange} hidden/>
            </Button>
        </>;

    const dragJSX: JSX.Element =
        <>
            <div>Drag a picture!</div>
            <div>or</div>
            <Button variant='contained' color='primary' component='label' className='upload-file-button' data-testid='upload-button'>
                Upload File
                <input type='file' onChange={onFileChange} hidden/>
            </Button>
        </>;

    const dropJSX: JSX.Element = <div>Drop a picture!</div>;

    return (
        <div className='new-ad-modal'>
            <div className='close-icon-button-wrapper'>
                <IconButton id='modal-close-button' aria-label='lose' size='medium' onClick={props.handleClose} data-testid='close-button'>
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
                    <div onDragStart={dragStartHandle}
                         onDragLeave={dragLeaveHandle}
                         onDragOver={dragStartHandle}
                         onDrop={drag ? onDropHandler : undefined}
                         className='drag-and-drop-wrapper'
                         style={drag ? {padding: '55px 0'} : undefined}
                         data-testid='drug-and-drop-area'
                    >
                        {drag ?  dropJSX : uploaded ? uploadedJSX : dragJSX}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdFormModal;
