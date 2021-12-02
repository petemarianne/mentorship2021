import React, { useContext, useEffect, useState } from 'react';
import './AdFormModal.scss';
import { Button, CircularProgress, IconButton, InputBase } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { app } from '../../firebase';
import { validateAd } from '../../utils/validateAd';
import { Fields } from '../../interfaces';
import PicSelect from '../PicUpload/PicSelect';
import { AuthContext } from '../../contexts/auth-context';
import { useFetchError } from '../../hooks';
import { useErrorHandler } from 'react-error-boundary';

interface AdFormModalProps {
    handleClose: () => void,
    adToEditID?: string
};

const AdFormModal: React.FC<AdFormModalProps> = (props): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [validate, setValidate] = useState<boolean>(true);
    const [file, setFile] = useState<File>();
    const [fileName, setFileName] = useState<string>('');
    const [fields, setFields] = useState<Fields>(
        {
            title: '',
            country: '',
            city: '',
            description: '',
            price: '',
        }
    );

    const {token} = useContext(AuthContext);

    useEffect(() => {
        if (props.adToEditID) {
            fetch(`api/ads/${props.adToEditID}`).then(response => response.json()).then((data) => {
                setFields({
                    title: data.title,
                    country: data.country,
                    city: data.city,
                    description: data.description,
                    price: data.price,
                })
                setFileName(data.picture.substring(73).substring(0, data.picture.substring(73).search(/\?alt/i)));
            });
        }
    }, []);

    const {request, error} = useFetchError();
    useErrorHandler(error)

    const edit = async (): Promise<void> => {
        const storageRef = app.storage().ref();
        if (file && token) {
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const fileUrl: string = await fileRef.getDownloadURL();
            request(`/api/ads/${props.adToEditID}`, {
                method: 'PUT', body: JSON.stringify({
                    ...fields,
                    picture: fileUrl,
                }), headers: {'Content-Type': 'application/json', 'authorization': token}
            }).then(() => {
                props.handleClose();
            });
        } else if (token) {
            request(`/api/ads/${props.adToEditID}`, {
                method: 'PUT', body: JSON.stringify({
                    ...fields
                }), headers: {'Content-Type': 'application/json', 'authorization': token}
            }).then(() => {
                props.handleClose();
            });
        }
    };

    const publish = async (): Promise<void> => {
        const storageRef = app.storage().ref();
        if (file && token) {
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const fileUrl: string = await fileRef.getDownloadURL();
            request('/api/ads', {
                method: 'POST', body: JSON.stringify({
                    ...fields,
                    picture: fileUrl,
                }), headers: {'Content-Type': 'application/json', 'authorization': token}
            }).then(() => {
                props.handleClose();
            });
        }
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
            <div className='modal-header'>{props.adToEditID ? 'EDIT YOUR AD' : 'NEW AD FORM'}</div>
            <form onSubmit={(event) => {
                event.preventDefault();
                if (validateAd(file, fields, !!props.adToEditID)) {
                    setLoading(true);
                    if (props.adToEditID) {
                        edit().then(() => {
                            setLoading(false)
                        });
                    } else {
                        publish().then(() => {
                            setLoading(false)
                        });
                    }
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
                            {!loading ? props.adToEditID ? 'Edit' : 'Publish' : <CircularProgress color='inherit' size='25px' data-testid='loading'/>}
                        </Button>
                    </div>
                    {fileName ? <PicSelect file={file} onFileSelect={setFile} fileName={fileName}/> : null}
                    {!fileName ? <PicSelect file={file} onFileSelect={setFile} /> : null}
                </div>
            </form>
        </div>
    );
};

export default AdFormModal;
