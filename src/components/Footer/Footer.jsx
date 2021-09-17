import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <div className={'footer-wrapper'}>
            <div className={'footer-line'}>&copy; “Dog Shop”, 2021</div>
            <div className={'footer-line'}>Piotr Piatrovich</div>
            <div className={'footer-line'}>ppiatrovich@exadel.com</div>
            <div className={'footer-line'}>+375-29-890-67-58</div>
        </div>
    )
}

export default Footer;
