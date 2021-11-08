import React, { useState } from 'react';
import { InputBase, Button } from '@material-ui/core';

const Login: React.FC = (): JSX.Element => {
    const [fields, setFields] = useState<{
        email: string,
        password: string,
    }>({
        email: '',
        password: ''
    });

    const [validation, setValidation] = useState<boolean>(false);

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, email: event.target.value}));
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, password: event.target.value}));
    };

    return (
        <form className='login-wrapper'>
            <div className='label'>Email</div>
            <div className='input'>
                <InputBase value={fields.email} onChange={handleEmail} fullWidth/>
            </div>
            <div className='label'>Password</div>
            <div className='input'>
                <InputBase id='standard-adornment-password' type='password' value={fields.password} onChange={handlePassword} fullWidth/>
            </div>
            {validation ? <div className='validation'>Incorrect email or password!</div> : null}
            <div className='button-wrapper'>
                <Button type='submit' className='button' variant='contained' color='primary'>Login</Button>
            </div>
        </form>
    );
}

export default Login;
