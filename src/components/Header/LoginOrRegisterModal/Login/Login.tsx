import React, { FormEvent, useState } from 'react';
import { InputBase, Button, CircularProgress } from '@material-ui/core';

interface RegistrationProps {
    onCloseModal: () => void,
}

const Login: React.FC<RegistrationProps> = (props): JSX.Element => {
    const [fields, setFields] = useState<{
        email: string,
        password: string,
    }>({
        email: '',
        password: ''
    });

    const [validation, setValidation] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, email: event.target.value}));
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, password: event.target.value}));
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        fetch('/api/auth/login',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: fields.email,
                    password: fields.password
                }),
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
             if (!response.ok) {
                 setValidation(false);
             } else {
                 props.onCloseModal();
             }
             setLoading(false);
        });
    }

    return (
        <form className='login-wrapper' onSubmit={onSubmit}>
            <div className='label'>Email</div>
            <div className='input'>
                <InputBase value={fields.email} onChange={handleEmail} fullWidth/>
            </div>
            <div className='label'>Password</div>
            <div className='input'>
                <InputBase id='standard-adornment-password' type='password' value={fields.password} onChange={handlePassword} fullWidth/>
            </div>
            {!validation ? <div className='validation'>Incorrect email or password!</div> : null}
            <div className='button-wrapper'>
                <Button type='submit' className='button' variant='contained' color='primary'>
                    {!loading ? 'Login' : <CircularProgress color='inherit' size='25px' data-testid='loading'/>}
                </Button>
            </div>
        </form>
    );
}

export default Login;
