import React, {useContext} from 'react';
import { Profile } from '../Profile/Profile';
import { AuthContext } from '../../contexts/auth-context';
import { Redirect } from 'react-router-dom';

export const MyProfile: React.FC = (): JSX.Element => {
    const {sellerID} = useContext(AuthContext);

    return (
        <>
            <Profile />
            {sellerID ? null : <Redirect to='/' />}
        </>
    );
}
