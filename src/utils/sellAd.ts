import { Ad, User } from '../interfaces';

export const sellAd = async (ad: Ad, user: User): Promise<void> => {
    fetch(`/api/ads/${ad.id}`, {method: 'PUT', body: JSON.stringify({status: 'sold'}), headers: {'Content-Type': 'application/json'}});
    fetch(`/api/users/${user.id}`, {method: 'PUT', body: JSON.stringify({action: 'remove'}), headers: {'Content-Type': 'application/json'}});
};
