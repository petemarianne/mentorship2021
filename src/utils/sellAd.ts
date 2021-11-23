import { Ad } from '../interfaces';

export const sellAd = async (ad: Ad): Promise<void> => {
    fetch(`/api/ads/${ad.id}`, {method: 'PUT', body: JSON.stringify({status: 'sold'}), headers: {'Content-Type': 'application/json', 'authorization': JSON.parse(localStorage.getItem('userData') as string).token}});
};
