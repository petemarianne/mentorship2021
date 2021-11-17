import { Ad} from '../interfaces';

export const sellAd = async (ad: Ad): Promise<void> => {
    fetch(`/api/ads/${ad.id}`, {method: 'PUT', body: JSON.stringify({status: 'sold'}), headers: {'Content-Type': 'application/json', 'authorization': JSON.parse(<string>localStorage.getItem('userData')).token}});
    fetch(`/api/users/${JSON.parse(<string>localStorage.getItem('userData')).userId}`, {method: 'PUT', body: JSON.stringify({action: 'remove'}), headers: {'Content-Type': 'application/json', 'authorization': JSON.parse(<string>localStorage.getItem('userData')).token}});
};
