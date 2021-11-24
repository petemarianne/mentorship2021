import { Ad } from '../interfaces';
import { fetchWrapper } from './fetchWrapper';
import React from 'react';

export const closeAd = async (ad: Ad, setError:  React.Dispatch<React.SetStateAction<boolean>>): Promise<void> => {
    fetchWrapper(setError, fetch, `/api/ads/${ad.id}`, {method: 'PUT', body: JSON.stringify({status: 'closed'}), headers: {'Content-Type': 'application/json', 'authorization': JSON.parse(localStorage.getItem('userData') as string).token}});
    //fetch(`/api/ads/${ad.id}`, {method: 'PUT', body: JSON.stringify({status: 'closed'}), headers: {'Content-Type': 'application/json', 'authorization': JSON.parse(localStorage.getItem('userData') as string).token}});
};
