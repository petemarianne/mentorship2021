import React, { useState } from 'react';
import './Header.scss';
import { AppBar, Button, InputBase, Toolbar, useMediaQuery, Avatar } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/dog-owner.jpg';
import AccountDropdown from './AccountDropdown/AccountDropdown';

const Header = () => {
    const screenSize = useMediaQuery('(min-width: 769px)');
    const [states, setStates] = useState(
        {
            isDropdownOpen: null,
        }
    );

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
                            <InputBase placeholder='Search for a breed…' fullWidth/>
                        </div>
                        <div className={'toolbar-right-side desktop'}>
                            <div className={'submit-an-ad-button-wrapper'}>
                                <Button color='primary' variant='contained' className={'submit-an-ad-button'}>Submit an ad</Button>
                            </div>
                            <Button onClick={handleDropdownOpen}>
                                <Avatar className='avatarHeader border-secondary' src={avatar}/>
                                <ArrowDropDownIcon className='icons-triangle icons-color' />
                            </Button>
                        </div>
                    </>
                )}
                <AccountDropdown isOpen={states.isDropdownOpen} handleDropdown={handleDropdownClose} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
