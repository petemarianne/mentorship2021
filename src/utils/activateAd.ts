import { Ad } from '../interfaces';

export const activateAd = async (ad: Ad): Promise<void> => {
    fetch(`/api/ads/${ad.id}`, {method: 'PUT', body: JSON.stringify({status: 'active'}), headers: {'Content-Type': 'application/json', 'authorization': JSON.parse(localStorage.getItem('userData') as string).token}});
};
