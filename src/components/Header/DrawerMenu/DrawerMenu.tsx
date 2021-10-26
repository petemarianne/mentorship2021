import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './DrawerMenu.scss';
import Filter from '../../Filter/Filter';

interface DrawerMenuProps {
    avatar: string,
    handleDrawer: (value: boolean) => void,
    handleOpen: () => void,
};

const DrawerMenu: React.FC<DrawerMenuProps> = (props): JSX.Element => {
    return (
        <div className='drawer-wrapper'>
            <div className='drawer-icons'>
                <Button onClick={() => props.handleDrawer(false)}>
                    <CloseIcon fontSize='large'/>
                </Button>
                <Avatar className='avatar-drawer' src={props.avatar} alt='avatar'/>
            </div>
            <Divider/>
            <div className='drawer-button-wrapper'>
                <Button className='submit-button' variant='contained' color='primary' onClick={() => {props.handleDrawer(false); props.handleOpen();}}>Submit an ad</Button>
            </div>
            <Divider className='drawer-divider'/>
            <Button className='my-account-button' variant='contained' color='secondary' component={Link} to={'/profile'}>My profile</Button>
            <Divider style={{backgroundColor: 'transparent'}} />
            <Button className='logout-button' variant='contained' color='secondary'>Logout</Button>
            <Divider className='drawer-divider'/>
            <Filter
                handleDrawer={props.handleDrawer}
                Divider={<Divider style={{backgroundColor: 'transparent'}}/>}
                isMenu={true}
            />
        </div>
    );
};

export default DrawerMenu;
