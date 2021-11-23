import React from 'react';
import { Profile } from '../Profile/Profile';

export const MyProfile: React.FC = (): JSX.Element => {
    return <Profile myProfile={true}/>;
}
