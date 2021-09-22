import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Divider, Button, Avatar, InputBase } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './DrawerMenu.scss';
import { useDispatch, useSelector } from 'react-redux';
import { countryFilter } from '../../../store/actions/countryAction';
import { cityFilter } from '../../../store/actions/cityAction';

const DrawerMenu = (props) => {
    const dispatch = useDispatch();
    const country = useSelector((state) => state.country);
    const city = useSelector((state) => state.city);

    const [countryState, setCountryState] = useState(country);
    const [cityState, setCityState] = useState(city);

    const handleCountry = (event) => {
        setCountryState(event.target.value);
    }

    const handleCity = (event) => {
        setCityState(event.target.value);
    }

    const handleEnter = () => {
        dispatch(countryFilter(countryState));
        dispatch(cityFilter(cityState));
    }

    return (
        <div className='drawer-wrapper'>
            <div className='drawer-icons'>
                <Button onClick={props.handleDrawer}>
                    <CloseIcon fontSize='large'/>
                </Button>
                <Avatar className='avatar-drawer' src={props.avatar} alt='avatar'/>
            </div>
            <Divider/>
            <div className='drawer-button-wrapper'>
                <Button className='submit-button' variant='contained' color='primary'>Submit an ad</Button>
            </div>
            <Divider className='drawer-divider'/>
            <Button className='my-account-button' variant='contained' color='secondary'>My account</Button>
            <Divider style={{backgroundColor: 'transparent'}} />
            <Button className='logout-button' variant='contained' color='secondary' onClick={props.handleLogoutModal}>Logout</Button>
            <Divider className='drawer-divider'/>
            <div className='filter-name'>Country</div>
            <Divider style={{backgroundColor: 'transparent'}} />
            <div className='search large'>
                <InputBase value={countryState} onChange={handleCountry} fullWidth/>
            </div>
            <div className='filter-name'>City</div>
            <Divider style={{backgroundColor: 'transparent'}} />
            <div className='search'>
                <InputBase value={cityState} onChange={handleCity} fullWidth/>
            </div>
            <div className='filter-name'>Price</div>
            <Divider style={{backgroundColor: 'transparent'}} />
            <InputBase className='left-search' fullWidth/>
            <InputBase className='right-search' fullWidth/>
            <Divider style={{backgroundColor: 'transparent'}} />
            <div className='filter-name'>Sort by</div>
            <Divider style={{backgroundColor: 'transparent'}} />
            <select className='filter-select'>
                <option>Date ↓</option>
                <option>Date ↑</option>
                <option>Price ↓</option>
                <option>Price ↑</option>
            </select>
            <Divider style={{backgroundColor: 'transparent'}} />
            <div className='drawer-button-wrapper'>
                <Button className='submit-button' variant='contained' color='primary' onClick={() => {handleEnter(); props.handleDrawer();}}>Show result</Button>
            </div>
        </div>
    );
};

DrawerMenu.propTypes = {
    avatar: PropTypes.string,
    handleLogoutModal: PropTypes.func,
    handleDrawer: PropTypes.func,
    handleSubmitAnAd: PropTypes.func,
};

export default DrawerMenu;
