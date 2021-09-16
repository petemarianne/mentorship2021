import React from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Divider, Button, Avatar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './DrawerMenu.scss';

const DrawerMenu = (props) => {

    return (
        <div className='drawer-wrapper'>
            <div className='drawer-icons'>
                <Button onClick={props.handleDrawer}>
                    <CloseIcon fontSize='large'/>
                </Button>
                <Avatar className='avatar-drawer' src={props.avatar} alt='avatar'/>
            </div>
            <Divider/>
            <div className='drawerSplit'>
                <Button variant='contained' color='secondary'>My account</Button>
                <Button variant='contained' color='secondary' onClick={props.handleLogoutModal}>Logout</Button>
            </div>
            <Divider className='drawer-divider'/>
        </div>
    );
};

DrawerMenu.propTypes = {
    avatar: PropTypes.any,
    handleLogoutModal: PropTypes.func,
    handleDrawer: PropTypes.func,
    handleSubmitAnAd: PropTypes.func,
};

export default DrawerMenu;