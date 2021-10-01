import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from '@material-ui/core';
import {Link} from "react-router-dom";

const AccountDropdown = (props) => {
    return (
        <Menu
            elevation={2}
            anchorEl={props.isOpen}
            open={Boolean(props.isOpen)}
            onClose={props.handleDropdown}
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
            <MenuItem onClick={props.handleDropdown} component={Link} to={'/profile'}>My profile</MenuItem>
            <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
        </Menu>
    );
};

AccountDropdown.propTypes = {
    isOpen: PropTypes.any,
    handleDropdown: PropTypes.func,
    handleLogout: PropTypes.func
};

export default AccountDropdown;
