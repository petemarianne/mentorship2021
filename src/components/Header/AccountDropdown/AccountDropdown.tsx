import React, { useContext } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './AccountDropdown.scss';
import { AuthContext } from '../../../contexts';

interface AccountDropdownProps {
    isOpen: Element | null,
    handleDropdown: () => void,
};

const AccountDropdown: React.FC<AccountDropdownProps> = (props): JSX.Element => {
    const {logout} = useContext(AuthContext);

    return (
        <>
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
                <MenuItem onClick={() => {
                    logout();
                    props.handleDropdown();
                }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default AccountDropdown;
