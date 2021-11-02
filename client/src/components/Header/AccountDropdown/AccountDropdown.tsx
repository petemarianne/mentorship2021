import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface AccountDropdownProps {
    isOpen: Element | null,
    handleDropdown: () => void,
};

const AccountDropdown: React.FC<AccountDropdownProps> = (props): JSX.Element => {
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
            <MenuItem onClick={props.handleDropdown} component={Link} to={'/myprofile'}>My profile</MenuItem>
            <MenuItem>Logout</MenuItem>
        </Menu>
    );
};

export default AccountDropdown;
