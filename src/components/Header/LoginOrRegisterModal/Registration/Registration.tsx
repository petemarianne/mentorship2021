import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton, InputBase } from '@material-ui/core';
import PicSelect from '../../../PicUpload/PicSelect';
import { app } from '../../../../firebase';
import { AuthContext } from '../../../../contexts';
import CloseIcon from '@material-ui/icons/Close';
import { User } from '../../../../interfaces';
import { useFetchError } from '../../../../hooks';
import { useErrorHandler } from 'react-error-boundary';

interface RegistrationProps {
    onCloseModal: () => void,
    userData?: User
}

enum AllFieldsValidation {
    InitialState,
    NotAllFieldsFilled,
    AllFieldsFilled,
}

const Registration: React.FC<RegistrationProps> = (props): JSX.Element => {
    const [fields, setFields] = useState<{
        email: string,
        password: string,
        repeatedPassword: string,
        name: string,
        phone: string,
    }>({
        email: '',
        password: '',
        repeatedPassword: '',
        name: '',
        phone: '',
    });
    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('');
    const [validation, setValidation] = useState<{
        email: boolean,
        password: boolean,
        repeatedPassword: boolean,
        phone: boolean,
        allFields: AllFieldsValidation,
        usedEmail: boolean,
    }>({
        email: true,
        password: true,
        repeatedPassword: true,
        phone: true,
        allFields: AllFieldsValidation.InitialState,
        usedEmail: true,
    });

    const {login, token, sellerID} = useContext(AuthContext);

    useEffect(() => {
        if (props.userData) {
            setFields(prevState => ({...prevState, name: props.userData!.name, phone: props.userData!.phone}));
            setFileName(props.userData!.avatar.substring(73).substring(0, props.userData!.avatar.substring(73).search(/\?alt/i)));
        }
        if (file) {
            setFileName(file.name);
        }
    }, [file]);

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, email: event.target.value}));
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, password: event.target.value}));
    };

    const handleRepeatedPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, repeatedPassword: event.target.value}));
    };

    const handleName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, name: event.target.value}));
    };

    const handlePhone = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, phone: event.target.value}));
    };

    const {request, error} = useFetchError();
    useErrorHandler(error)

    const edit = async (): Promise<void> => {
        const storageRef = app.storage().ref();
        if (file && token) {
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const fileUrl: string = await fileRef.getDownloadURL();
            request(`/api/users/${sellerID}`, {
                method: 'PUT', body: JSON.stringify({
                    avatar: fileUrl,
                    name: fields.name,
                    phone: fields.phone
                }), headers: {'Content-Type': 'application/json', 'authorization': token}
            }).then(() => {
                props.onCloseModal();
            });
        } else if (token) {
            request(`/api/users/${sellerID}`, {
                method: 'PUT', body: JSON.stringify({
                    name: fields.name,
                    phone: fields.phone
                }), headers: {'Content-Type': 'application/json', 'authorization': token}
            }).then(() => {
                props.onCloseModal();
            });
        }
    };

    const onSubmit = async (): Promise<void> => {
        let flag = false;
        if (validation.allFields !== AllFieldsValidation.AllFieldsFilled) {
            for (let key in fields) {
                // @ts-ignore
                if (fields[key] === '' || !file) {
                    setValidation(prevState => ({...prevState, allFields: AllFieldsValidation.NotAllFieldsFilled}));
                    flag = false;
                    break;
                }
                setValidation(prevState => ({...prevState, allFields: AllFieldsValidation.AllFieldsFilled}));
                flag = true;
            }
        }
        if (validation.allFields === AllFieldsValidation.AllFieldsFilled || flag) {
            flag = false;
            const mailFormat = /^([a-zA-Z0-9._]+)@([a-zA-Z0-9._]+)\.([a-z]{2,3})$/;
            if (!mailFormat.test(fields.email) && fields.email !== '') {
                setValidation(prevState => ({...prevState, email: false}));
                flag = false;
            } else {
                setValidation(prevState => ({...prevState, email: true}));
                flag = true;
            }
            if (fields.password.length < 6) {
                setValidation(prevState => ({...prevState, password: false}));
                flag = false;
            } else {
                setValidation(prevState => ({...prevState, password: true}));
                flag = true;
                if (fields.password !== fields.repeatedPassword) {
                    setValidation(prevState => ({...prevState, repeatedPassword: false}));
                    flag = false;
                } else {
                    setValidation(prevState => ({...prevState, repeatedPassword: true}));
                    flag = true;
                }
            }
            const phoneFormat = /^\+\d+$/;
            if (!phoneFormat.test(fields.phone) && fields.phone !== '') {
                setValidation(prevState => ({...prevState, phone: false}));
                flag = false;
            } else {
                setValidation(prevState => ({...prevState, phone: true}));
                flag = true;
            }
            const storageRef = app.storage().ref();
            if (flag && file) {
                const fileRef = storageRef.child(file.name);
                await fileRef.put(file);
                const fileUrl: string = await fileRef.getDownloadURL();
                const registerResponse = await fetch('/api/auth/register',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            email: fields.email,
                            password: fields.password,
                            name: fields.name,
                            phone: fields.phone,
                            avatar: fileUrl
                        }),
                        headers: {'Content-Type': 'application/json'}
                    });
                const registerData = await registerResponse.json();
                if (registerResponse.ok) {
                    login(registerData.token, registerData.userID);
                    props.onCloseModal();
                } else {
                    if (registerData.message === 'This email is already used!') {
                        setValidation(prevState => ({...prevState, usedEmail: false}));
                    }
                }
            }
        }
    };

    return (
        <>
            {props.userData ?
                <>
                    <div className='close-icon-button-wrapper'>
                        <IconButton id='modal-close-button' aria-label='lose' size='medium' onClick={props.onCloseModal} data-testid='close-button'>
                            <CloseIcon fontSize='medium'/>
                        </IconButton>
                    </div>
                    <div className='edit-profile'>EDIT PROFILE</div>
                </>
                : null}
            <form className='login-wrapper' onSubmit={(event) => {
                event.preventDefault();
                setLoading(true);
                if (props.userData) {
                    edit().then(() => setLoading(false));
                } else {
                    onSubmit().then(() => setLoading(false));
                }
            }}>
                {!props.userData ?
                    <>
                        <div className='label'>Email</div>
                        <div className={!validation.email ? 'input validate' : 'input'}>
                            <InputBase value={fields.email} onChange={handleEmail} fullWidth/>
                        </div>
                        {!validation.email ? <div className='validation-registration'>Incorrect email!</div> : null}
                        {!validation.usedEmail ? <div className='validation-registration'>This email is already used!</div> : null}
                        <div className='label'>Password</div>
                        <div className={!validation.password || !validation.repeatedPassword ? 'input validate' : 'input'}>
                            <InputBase type='password' value={fields.password} onChange={handlePassword} fullWidth/>
                        </div>
                        {!validation.password ? <div className='validation-registration'>The password must contain at least 6 characters!</div> : null}
                        <div className='label'>Repeat password</div>
                        <div className={!validation.repeatedPassword ? 'input validate' : 'input'}>
                            <InputBase type='password' value={fields.repeatedPassword} onChange={handleRepeatedPassword} fullWidth/>
                        </div>
                        {!validation.repeatedPassword ? <div className='validation-registration'>Password don't match!</div> : null}
                    </>
                    : null}
                <div className='label'>Name</div>
                <div className='input'>
                    <InputBase value={fields.name} onChange={handleName} fullWidth/>
                </div>
                <div className='label'>Phone number</div>
                <div className={!validation.phone ? 'input validate' : 'input'}>
                    <InputBase value={fields.phone} onChange={handlePhone} fullWidth/>
                </div>
                {!validation.phone ? <div className='validation-registration'>Incorrect phone number!</div> : null}
                {fileName ? <PicSelect file={file} onFileSelect={setFile} fileName={fileName}/> : null}
                {!fileName ? <PicSelect file={file} onFileSelect={setFile} /> : null}
                {validation.allFields === AllFieldsValidation.NotAllFieldsFilled ? <div className='validation-registration'>Fill in all the fields!</div> : null}
                <div className='button-wrapper'>
                    <Button type='submit' className='button' variant='contained' color='primary'>
                        {!loading ? props.userData ? 'Edit' : 'Register' : <CircularProgress color='inherit' size='25px' data-testid='loading'/>}
                    </Button>
                </div>
            </form>
        </>
    );
}

export default Registration;
