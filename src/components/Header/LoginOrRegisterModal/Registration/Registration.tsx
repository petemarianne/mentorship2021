import React, { FormEvent, useState } from 'react';
import { Button, CircularProgress, InputBase } from '@material-ui/core';
import PicSelect from '../../../PicUpload/PicSelect';
import { app } from '../../../../firebase';

const Registration: React.FC = (): JSX.Element => {
    const [fields, setFields] = useState<{
        email: string,
        password: string,
        repeatedPassword: string,
        name: string,
        phone: string,
        picture: File | null,
    }>({
        email: '',
        password: '',
        repeatedPassword: '',
        name: '',
        phone: '',
        picture: null,
    });
    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState<boolean>(false);
    const [validation, setValidation] = useState<{
        email: boolean,
        repeatedPassword: boolean,
        phone: boolean,
        allFields: boolean
    }>({
        email: false,
        repeatedPassword: false,
        phone: false,
        allFields: false
    });

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

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const mailFormat = /^([a-zA-Z0-9._]+)@([a-zA-Z0-9._]+)\.([a-z]{2,3})$/;
        if (!mailFormat.test(fields.email) && fields.email !== '') {
            setValidation(prevState => ({...prevState, email: true}));
        }
        else {
            setValidation(prevState => ({...prevState, email: false}));
        }
        if (fields.password !== fields.repeatedPassword) {
            setValidation(prevState => ({...prevState, repeatedPassword: true}));
        } else {
            setValidation(prevState => ({...prevState, repeatedPassword: false}));
        }
        const phoneFormat = /^\+\d+$/;
        if (!phoneFormat.test(fields.phone)  && fields.phone !== '') {
            setValidation(prevState => ({...prevState, phone: true}));
        } else {
            setValidation(prevState => ({...prevState, phone: false}));
        }
        if (file === undefined) {
            setValidation(prevState => ({...prevState, allFields: true}));
        }
        if (!(validation.email && validation.repeatedPassword && validation.phone)) {
            for (let key in fields) {
                // @ts-ignore
                if (fields[key] === '') {
                    setValidation(prevState => ({...prevState, allFields: true}));
                    break;
                }
                setValidation(prevState => ({...prevState, allFields: false}));
            }
        }
        const storageRef = app.storage().ref();
        if (file) {
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const fileUrl: string = await fileRef.getDownloadURL();
        }
    };

    return (
        <form className='login-wrapper' onSubmit={(e) => {
            setLoading(true);
            onSubmit(e).then(() => setLoading(false));
        }}>
            <div className='label'>Email</div>
            <div className={validation.email ? 'input validate' : 'input'}>
                <InputBase value={fields.email} onChange={handleEmail} fullWidth/>
            </div>
            {validation.email ? <div className='validation-registration'>Incorrect email!</div> : null}
            <div className='label'>Password</div>
            <div className={validation.repeatedPassword ? 'input validate' : 'input'}>
                <InputBase type='password' value={fields.password} onChange={handlePassword} fullWidth/>
            </div>
            <div className='label'>Repeat password</div>
            <div className={validation.repeatedPassword ? 'input validate' : 'input'}>
                <InputBase type='password' value={fields.repeatedPassword} onChange={handleRepeatedPassword} fullWidth/>
            </div>
            {validation.repeatedPassword ? <div className='validation-registration'>Password don't match!</div> : null}
            <div className='label'>Name</div>
            <div className='input'>
                <InputBase value={fields.name} onChange={handleName} fullWidth/>
            </div>
            <div className='label'>Phone number</div>
            <div className={validation.phone ? 'input validate' : 'input'}>
                <InputBase value={fields.phone} onChange={handlePhone} fullWidth/>
            </div>
            {validation.phone ? <div className='validation-registration'>Incorrect phone number!</div> : null}
            <PicSelect file={file} setFile={setFile} />
            {validation.allFields ? <div className='validation-registration'>Fill in all the fields!</div> : null}
            <div className='button-wrapper'>
                <Button type='submit' className='button' variant='contained' color='primary'>
                    {!loading ? 'Register' : <CircularProgress color='inherit' size='25px' data-testid='loading'/>}
                </Button>
            </div>
        </form>
    );
}

export default Registration;
