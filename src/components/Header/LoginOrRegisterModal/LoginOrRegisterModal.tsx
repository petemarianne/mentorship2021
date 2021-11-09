import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import './LoginOrRegisterModal.scss';
import { useScreenSize } from '../../../hooks/useScreenSize';

interface LoginOrRegisterModalProps {
    handleClose?: () => void,
};

const LoginOrRegisterModal: React.FC<LoginOrRegisterModalProps> = (props): JSX.Element => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const { desktop } = useScreenSize();

    return (
        <div className='login-or-register-modal-wrapper'>
            {desktop ?
                <div className='close-icon-button-wrapper'>
                    <IconButton className='modal-close-button' aria-label='lose' size='medium'
                                onClick={props.handleClose} data-testid='close-button'>
                        <CloseIcon fontSize='medium'/>
                    </IconButton>
                </div>
                : null
            }
            <div className='navigation-bar'>
                <div className={isLogin ? 'login active' : 'login'} onClick={() => setIsLogin(true)}>LOGIN</div>
                <div className={isLogin ? 'registration' : 'registration active'} onClick={() => setIsLogin(false)}>REGISTRATION</div>
            </div>
            {isLogin ? <Login /> : <Registration />}
        </div>
    );
};

export default LoginOrRegisterModal;
