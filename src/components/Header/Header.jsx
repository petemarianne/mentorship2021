import React, { useState } from 'react';
import './Header.scss';
import { AppBar, Button, InputBase, Toolbar, useMediaQuery, Avatar, IconButton, Drawer, Modal } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/dog-owner.jpg';
import AccountDropdown from './AccountDropdown/AccountDropdown';
import DrawerMenu from './DrawerMenu/DrawerMenu';
import { useDispatch, useSelector } from 'react-redux';
import { breedSearch } from '../../store/actions/breedAction';
import { Link } from 'react-router-dom';
import { AdFormModal } from '../AdFormModal/AdFormModal';

const Header = () => {
    const dispatch = useDispatch();
    const breed = useSelector((state) => state.breed);

    const screenSize = useMediaQuery('(min-width: 769px)');

    const [states, setStates] = useState(
        {
            isDropdownOpen: null,
            isDrawerOpen: false,
        }
    );
    const [breedState, setBreedState] = useState(breed)
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDropdownOpen = (event) => {
        setStates({
            isDropdownOpen: event.currentTarget,
        });
    }

    const handleDropdownClose = () => {
        setStates({
            isDropdownOpen: null,
        });
    }

    const handleDrawer = (value) => {
        setStates({
            isDrawerOpen: value,
        });
    }

    const handleBreed = (event) => {
        setBreedState(event.target.value)
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            dispatch(breedSearch(breedState));
        }
    }

    //window.location.href = '/';

    return (
        <AppBar color='inherit' position='static' className={'header-wrapper'} elevation={0}>
            <Toolbar className={'toolbar'}>
                {screenSize && (
                    <>
                        <Link className={'toolbar-left-side desktop'} to={'/'} style={{ textDecoration: 'none' }}>
                            <div>D</div>
                            <div className={'logo'}><img src={logo} alt={'logo'}/></div>
                            <div>G &nbsp;SHOP</div>
                        </Link>
                        <div className={'search desktop'}>
                            <InputBase placeholder='Search for a breed…' value={breedState} onChange={handleBreed} onKeyDown={handleEnter} fullWidth/>
                        </div>
                        <div className={'toolbar-right-side desktop'}>
                            <div className={'submit-an-ad-button-wrapper'}>
                                <Button color='primary' variant='contained' className={'submit-an-ad-button'} onClick={handleOpen}>Submit an ad</Button>
                            </div>
                            <Button onClick={handleDropdownOpen}>
                                <Avatar className='avatar-header' src={avatar}/>
                                <ArrowDropDownIcon className='icons-triangle icons-color' />
                            </Button>
                        </div>
                    </>
                )}
                {!screenSize && (
                    <>
                        <div className={'toolbar-left-side mobile'}>
                            <IconButton
                                edge='start'
                                aria-haspopup='true'
                                className={'menu-button'}
                                onClick={() => handleDrawer(true)}
                            >
                                <MenuIcon fontSize='large' className='menu-icon' />
                            </IconButton>
                            <Drawer
                                elevation={2}
                                anchor={'left'}
                                open={states.isDrawerOpen}
                                onClose={() => handleDrawer(false)}
                            >
                                <DrawerMenu avatar={avatar} handleDrawer={() => handleDrawer(false)} handleOpen={handleOpen}/>
                            </Drawer>
                            <Link className={'logo'} to={'/'} style={{ textDecoration: 'none' }}><img src={logo} alt={'logo'}/></Link>
                        </div>
                        <div className={'search mobile'}>
                            <InputBase placeholder='Search…' value={breedState} onChange={handleBreed} onKeyDown={handleEnter} fullWidth/>
                        </div>
                    </>
                )}
                <AccountDropdown isOpen={states.isDropdownOpen} handleDropdown={handleDropdownClose} />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='simple-modal-title'
                    aria-describedby='simple-modal-description'
                    className='modal'>
                    <div className='modal-content'>
                        <AdFormModal handleClose={handleClose}/>
                    </div>
                </Modal>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
