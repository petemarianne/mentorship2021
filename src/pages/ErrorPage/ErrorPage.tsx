import React from 'react';
import './ErrorPage.scss';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

interface ErrorPageProps {
    is401?: boolean
}

export const ErrorPage: React.FC<ErrorPageProps> = (props): JSX.Element => {
    const pathname = useLocation().pathname;

    return (
        <>
            <div className='logo404-wrapper'>
                <div className='four'>4</div>
                <div className='logo'><img src={logo} alt='logo'/></div>
                <div className={props.is401 ? 'four one' : 'four'}>{props.is401 ? '1' : '4'}</div>
            </div>
            {props.is401 ?
                <>
                    <div className='message-wrapper'>
                        <div>Oops, seems like this action is forbidden for you now because your session is over!</div>
                        <div>Please, refresh the page.</div>
                    </div>
                    <div className='button-wrapper' />
                </>
                :
                <>
                    <div className='message-wrapper'>
                        <div>Oops, this page</div>
                        <div className='page-name'>{pathname}</div>
                        <div> was not found!</div>
                        <div>Either something went wrong or the page doesn't exist anymore.</div>
                    </div>
                    <div className='button-wrapper'>
                        <Button color='primary' variant='contained' component={Link} to='/' className='go-home-button'>Go Home</Button>
                    </div>
                </>
            }
        </>
    )
}
