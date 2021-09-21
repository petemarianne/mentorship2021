import React, { useState } from 'react';
import './Header.scss';
import { AppBar, Button, InputBase, Toolbar, useMediaQuery, Avatar, IconButton, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/dog-owner.jpg';
import AccountDropdown from './AccountDropdown/AccountDropdown';
import DrawerMenu from './DrawerMenu/DrawerMenu';
import { useDispatch, useSelector } from 'react-redux';
import { breedSearch } from '../../store/actions/breedAction';

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

    return (
        <AppBar color='inherit' position='static' className={'header-wrapper'} elevation={0}>
            <Toolbar className={'toolbar'}>
                {screenSize && (
                    <>
                        <div className={'toolbar-left-side desktop'}>
                            <div>D</div>
                            <div className={'logo'}><img src={logo} alt={'logo'}/></div>
                            <div>G &nbsp;SHOP</div>
                        </div>
                        <div className={'search desktop'}>
                            <InputBase placeholder='Search for a breed…' value={breedState} onChange={handleBreed} onKeyDown={handleEnter} fullWidth/>
                        </div>
                        <div className={'toolbar-right-side desktop'}>
                            <div className={'submit-an-ad-button-wrapper'}>
                                <Button color='primary' variant='contained' className={'submit-an-ad-button'}>Submit an ad</Button>
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
                                <DrawerMenu avatar={avatar} handleDrawer={() => handleDrawer(false)}/>
                            </Drawer>
                            <div className={'logo'}><img src={logo} alt={'logo'}/></div>
                        </div>
                        <div className={'search mobile'}>
                            <InputBase placeholder='Search…' value={breed} onChange={handleBreed} fullWidth/>
                        </div>
                    </>
                )}
                <AccountDropdown isOpen={states.isDropdownOpen} handleDropdown={handleDropdownClose} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
