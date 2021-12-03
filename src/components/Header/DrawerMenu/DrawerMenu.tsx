import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './DrawerMenu.scss';
import Filter from '../../Filter/Filter';
import LoginOrRegisterModal from '../LoginOrRegisterModal/LoginOrRegisterModal';
import { AuthContext } from '../../../contexts';

interface DrawerMenuProps {
    avatar: string,
    closeMenu: () => void,
    handleOpen: () => void,
};

const DrawerMenu: React.FC<DrawerMenuProps> = (props): JSX.Element => {
    const filterProps = {
        closeMenu: props.closeMenu,
        Divider: <Divider style={{backgroundColor: 'transparent'}}/>,
    };

    const {sellerID, logout} = useContext(AuthContext);

    const [login, setLogin] = useState<boolean>(false)

    return (
        <div className='drawer-wrapper'>
            <div className='drawer-icons'>
                <Button onClick={() => props.closeMenu()}>
                    <CloseIcon fontSize='large'/>
                </Button>
                {sellerID ? <Avatar className='avatar-drawer' src={props.avatar} alt='avatar'/> : null}
            </div>
            {!login ?
                <>
                    <Divider/>
                    <div className='drawer-button-wrapper'>
                        <Button className='submit-button' variant='contained' color='primary' onClick={() => {
                            if (sellerID) {
                                props.closeMenu();
                                props.handleOpen();
                            } else {
                                setLogin(true);
                            }
                        }}>{sellerID ? 'Submit an ad' : 'Login'}</Button>
                    </div>
                    {sellerID ?
                        <>
                            <Divider className='drawer-divider'/>
                            <Button className='my-account-button' variant='contained' color='secondary' component={Link} to={'/myprofile'} onClick={props.closeMenu}>My profile</Button>
                            <Divider style={{backgroundColor: 'transparent'}} />
                            <Button className='logout-button' variant='contained' color='secondary' onClick={() =>{
                                logout();
                                props.closeMenu();
                            }
                            }>Logout</Button>
                        </>
                        : null
                    }
                    <Divider className='drawer-divider'/>
                    <Filter
                    slideView={filterProps}
                    />
                </> :
                <LoginOrRegisterModal handleClose={props.closeMenu} />
            }
        </div>
    );
};

export default DrawerMenu;
