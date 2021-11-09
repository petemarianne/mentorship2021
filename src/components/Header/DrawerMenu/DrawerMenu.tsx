import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './DrawerMenu.scss';
import Filter from '../../Filter/Filter';
import LoginOrRegisterModal from '../LoginOrRegisterModal/LoginOrRegisterModal';

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

    const [login, setLogin] = useState<boolean>(false)

    return (
        <div className='drawer-wrapper'>
            <div className='drawer-icons'>
                <Button onClick={() => props.closeMenu()}>
                    <CloseIcon fontSize='large'/>
                </Button>
                <Avatar className='avatar-drawer' src={props.avatar} alt='avatar'/>
            </div>
            {!login ?
                <>
                    <Divider/>
                    <div className='drawer-button-wrapper'>
                        <Button className='submit-button' variant='contained' color='primary' onClick={() => {
                            props.closeMenu();
                            props.handleOpen();
                        }}>Submit an ad</Button>
                    </div>
                    <Divider className='drawer-divider'/>
                    <Button className='my-account-button' variant='contained' color='secondary' component={Link} to={'/profile'}>My profile</Button>
                    <Divider style={{backgroundColor: 'transparent'}} />
                    <Button className='logout-button' variant='contained' color='secondary' onClick={() => setLogin(true)}>Login</Button>
                    <Divider className='drawer-divider'/>
                    <Filter
                    slideView={filterProps}
                    />
                </> :
                <LoginOrRegisterModal />
            }
        </div>
    );
};

export default DrawerMenu;
