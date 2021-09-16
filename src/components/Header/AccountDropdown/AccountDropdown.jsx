import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from '@material-ui/core';

const AccountDropdown = ({isOpen, handleDropdown, handleLogout}) => {
    return (
        <Menu
            elevation={2}
            anchorEl={isOpen}
            open={Boolean(isOpen)}
            onClose={handleDropdown}
            keepMounted
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}>
            <MenuItem onClick={handleDropdown}>My profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );
};

AccountDropdown.propTypes = {
    isOpen: PropTypes.any,
    handleDropdown: PropTypes.func,
    handleLogout: PropTypes.func
};

export default AccountDropdown;
