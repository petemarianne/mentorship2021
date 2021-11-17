import { Ad } from '../interfaces';

export const activateAd = async (ad: Ad): Promise<void> => {
    fetch(`/api/ads/${ad.id}`, {method: 'PUT', body: JSON.stringify({status: 'active'}), headers: {'Content-Type': 'application/json', 'authorization': JSON.parse(<string>localStorage.getItem('userData')).token}});
    fetch(`/api/users/${JSON.parse(<string>localStorage.getItem('userData')).userId}`, {method: 'PUT', body: JSON.stringify({action: 'add'}), headers: {'Content-Type': 'application/json', 'authorization': JSON.parse(<string>localStorage.getItem('userData')).token}});
};
