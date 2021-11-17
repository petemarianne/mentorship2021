import React, { useContext, useState } from 'react';
import './AdFormModal.scss';
import { Button, CircularProgress, IconButton, InputBase } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { app } from '../../firebase';
import { validateAd } from '../../utils';
import { Fields } from '../../interfaces';
import PicSelect from '../PicUpload/PicSelect';
import { AuthContext } from '../../contexts/auth-context';

interface AdFormModalProps {
    handleClose: () => void,
};

const AdFormModal: React.FC<AdFormModalProps> = (props): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [validate, setValidate] = useState<boolean>(true);
    const [file, setFile] = useState<File>();
    const [fields, setFields] = useState<Fields>(
        {
            title: '',
            country: '',
            city: '',
            description: '',
            price: '',
        }
    )

    const {token, sellerID} = useContext(AuthContext);

    const publish = async (): Promise<void> => {
        const storageRef = app.storage().ref();
        if (file && token) {
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const fileUrl: string = await fileRef.getDownloadURL();
            fetch('api/ads').then(response => response.json()).then((data) => {
                fetch('/api/ads', {
                    method: 'POST', body: JSON.stringify({
                        ...fields,
                        picture: fileUrl,
                        date: {
                            seconds: new Date().getTime() / 1000,
                            nanoseconds: 0,
                        },
                        status: 'active',
                        sellerID: sellerID,
                        id: 'ad' + (data.length + 1),
                    }), headers: {'Content-Type': 'application/json', 'authorization': token}
                });
            });
            fetch(`/api/users/${sellerID}`, {
                method: 'PUT',
                body: JSON.stringify({action: 'add'}),
                headers: {'Content-Type': 'application/json', 'authorization': token}
            });
        }
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
                    <PicSelect file={file} onFileSelect={setFile} />
                </div>
            </form>
        </div>
    );
};

export default AdFormModal;
