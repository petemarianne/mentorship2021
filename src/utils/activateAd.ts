import { Ad } from '../interfaces';

export const activateAd = async (ad: Ad): Promise<void> => {
    fetch(`/api/ads/${ad.id}`, {method: 'PUT', body: JSON.stringify({status: 'active'}), headers: {'Content-Type': 'application/json', 'authorization': JSON.parse(localStorage.getItem('userData') as string).token}});
    fetch(`/api/users/${JSON.parse(localStorage.getItem('userData') as string).userId}`, {method: 'PUT', body: JSON.stringify({action: 'add'}), headers: {'Content-Type': 'application/json', 'authorization': JSON.parse(localStorage.getItem('userData') as string).token}});
};
