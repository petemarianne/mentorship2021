import React, {FormEvent, useState} from 'react';
import { Button, InputBase } from '@material-ui/core';

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
    })

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

    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!mailFormat.test(fields.email)) {
            setValidation(prevState => ({...prevState, email: true}));
            console.log('email')
        }
        else {
            setValidation(prevState => ({...prevState, email: false}));
        }
        if (fields.password !== fields.repeatedPassword) {
            setValidation(prevState => ({...prevState, repeatedPassword: true}));
            console.log('password')
        } else {
            setValidation(prevState => ({...prevState, repeatedPassword: false}));
        }
        const phoneFormat = /^[+]\d$/;
        if (!phoneFormat.test(fields.phone)) {
            setValidation(prevState => ({...prevState, phone: true}));
            console.log('phone')
        } else {
            setValidation(prevState => ({...prevState, phone: false}));
        }
        for (let key in fields) {
            // @ts-ignore
            if (fields[key] === '') {
                setValidation(prevState => ({...prevState, allFields: true}));
                break;
            }
        }
    };

    return (
        <form className='login-wrapper'>
            <div className='label'>Email</div>
            <div className='input'>
                <InputBase value={fields.email} onChange={handleEmail} fullWidth/>
            </div>
            <div className='label'>Password</div>
            <div className='input'>
                <InputBase type='password' value={fields.password} onChange={handlePassword} fullWidth/>
            </div>
            <div className='label'>Repeat password</div>
            <div className='input'>
                <InputBase type='password' value={fields.repeatedPassword} onChange={handleRepeatedPassword} fullWidth/>
            </div>
            <div className='label'>Name</div>
            <div className='input'>
                <InputBase value={fields.name} onChange={handleName} fullWidth/>
            </div>
            <div className='label'>Phone number</div>
            <div className='input'>
                <InputBase value={fields.phone} onChange={handlePhone} fullWidth/>
            </div>
            <div className='button-wrapper'>
                <Button type='submit' className='button' variant='contained' color='primary'>Register</Button>
            </div>
        </form>
    );
}

export default Registration;
