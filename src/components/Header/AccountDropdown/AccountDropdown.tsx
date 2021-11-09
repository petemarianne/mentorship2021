import React, {useState} from 'react';
import { Menu, MenuItem, Modal } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LoginOrRegisterModal from '../LoginOrRegisterModal/LoginOrRegisterModal';
import './AccountDropdown.scss';

interface AccountDropdownProps {
    isOpen: Element | null,
    handleDropdown: () => void,
};

const AccountDropdown: React.FC<AccountDropdownProps> = (props): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

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
                <MenuItem onClick={() => {props.handleDropdown(); handleOpen();}}>Login</MenuItem>
            </Menu>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                className='modal'>
                <div className='modal-content'>
                    <LoginOrRegisterModal handleClose={handleClose}/>
                </div>
            </Modal>
        </>
    );
};

export default AccountDropdown;
