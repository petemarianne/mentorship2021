import React, { useContext, useEffect, useState } from 'react';
import './Header.scss';
import { AppBar, Button, InputBase, Toolbar, Avatar, IconButton, Drawer, Modal } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import logo from '../../assets/images/logo.svg';
import AccountDropdown from './AccountDropdown/AccountDropdown';
import DrawerMenu from './DrawerMenu/DrawerMenu';
import { Link, Redirect, useLocation } from 'react-router-dom';
import AdFormModal from '../AdFormModal/AdFormModal';
import { useScreenSize } from '../../hooks/useScreenSize';
import { FilterContext } from '../../contexts/filter-context';
import { AuthContext } from '../../contexts/auth-context';
import LoginOrRegisterModal from './LoginOrRegisterModal/LoginOrRegisterModal';

const Header: React.FC = (): JSX.Element => {
    const [breed, setBreed] = useState<string>('');
    const [redirect, setRedirect] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<Element | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const currentPathname: string = useLocation().pathname;

    const {filter, setFilterState} = useContext(FilterContext);
    const {sellerID, setSellerID} = useContext(AuthContext);

    const {desktop} = useScreenSize();

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleDropdownOpen = (event: React.MouseEvent): void => {
        setIsDropdownOpen(event.currentTarget);
    };

    const handleDropdownClose = (): void => {
        setIsDropdownOpen(null);
    };

    const handleDrawer = (value: boolean): void => {
        setIsDrawerOpen(value);
    };

    const handleBreed = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setBreed(event.target.value);
    };

    const handleEnter = (event: React.KeyboardEvent): void => {
        if (event.key === 'Enter') {
            localStorage.setItem('search', JSON.stringify({breed: breed}));
            setFilterState({...filter, breed});
            if (currentPathname !== '/') {
                setRedirect(true);
            } else {
                setRedirect(false);
            }
        }
    };

    const renderRedirect = (): JSX.Element => {
        if (redirect) {
            return <Redirect to='/' />;
        }
        return <></>;
    };

    const [loggedInUsersAvatar, setLoggedInUsersAvatar] = useState<string>('');

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('search') as string)) {
            localStorage.setItem('search',JSON.stringify({breed: ''}));
        }
        if (JSON.parse(localStorage.getItem('search') as string).breed !== '') {
            localStorage.setItem('search',JSON.stringify({breed: ''}));
        }
        setBreed(JSON.parse(localStorage.getItem('search') as string).breed);
        fetch('api/users/seller1').then(response => response.json()).then((data) => {
            setLoggedInUsersAvatar(data.avatar);
        })
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            fetch('/api/auth/login', {method: 'GET', headers: {'Authorization': token}})
                .then(response => response.json())
                .then(data => setSellerID(data.userID));
        }
    }, [sellerID]);

    return (
        <AppBar color='inherit' position='static' className='header-wrapper' elevation={0}>
            <Toolbar className='toolbar'>
                {desktop && (
                    <>
                        <Link className='toolbar-left-side desktop' to='/' style={{ textDecoration: 'none' }}>
                            <div>D</div>
                            <div className='logo'><img src={logo} alt='logo'/></div>
                            <div>G &nbsp;SHOP</div>
                        </Link>
                        <div className='search desktop'>
                            <InputBase placeholder='Search for a breed…' value={breed} onChange={handleBreed} onKeyDown={handleEnter} fullWidth/>
                        </div>
                        <div className='toolbar-right-side desktop'>
                            {sellerID ?
                                <>
                                    <div className='submit-an-ad-button-wrapper'>
                                        <Button color='primary' variant='contained' className='submit-an-ad-button'
                                                onClick={handleOpen}>Submit an ad</Button>
                                    </div>
                                    <Button onClick={handleDropdownOpen}>
                                        <Avatar className='avatar-header' src={loggedInUsersAvatar}/>
                                        <ArrowDropDownIcon className='icons-triangle icons-color'/>
                                    </Button>
                                </>
                                :
                                <div className='submit-an-ad-button-wrapper'>
                                    <Button color='primary' variant='contained' className='submit-an-ad-button'
                                            onClick={handleOpen}>Login</Button>
                                </div>
                            }
                        </div>
                    </>
                )}
                {!desktop && (
                    <>
                        <div className='toolbar-left-side mobile'>
                            <IconButton
                                edge='start'
                                aria-haspopup='true'
                                className='menu-button'
                                onClick={() => handleDrawer(true)}
                            >
                                <MenuIcon fontSize='large' className='menu-icon' />
                            </IconButton>
                            <Drawer
                                elevation={2}
                                anchor='left'
                                open={isDrawerOpen}
                                onClose={() => handleDrawer(false)}
                            >
                                <DrawerMenu avatar={loggedInUsersAvatar} closeMenu={() => handleDrawer(false)} handleOpen={handleOpen}/>
                            </Drawer>
                            <Link className='logo' to='/' style={{ textDecoration: 'none' }}><img src={logo} alt='logo'/></Link>
                        </div>
                        <div className='search mobile'>
                            <InputBase placeholder='Search…' value={breed} onChange={handleBreed} onKeyDown={handleEnter} fullWidth/>
                        </div>
                    </>
                )}
                <AccountDropdown isOpen={isDropdownOpen} handleDropdown={handleDropdownClose} />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='simple-modal-title'
                    aria-describedby='simple-modal-description'
                    className='modal'>
                    <div className='modal-content'>
                        {sellerID ? <AdFormModal handleClose={handleClose}/> : <LoginOrRegisterModal handleClose={handleClose}/>}
                    </div>
                </Modal>
                {renderRedirect()}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
