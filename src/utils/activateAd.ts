import { Ad, User } from '../interfaces';

export const activateAd = async (ad: Ad, user: User): Promise<void> => {
    fetch(`/api/ads/${ad.id}`, {method: 'PUT', body: JSON.stringify({status: 'active'}), headers: {'Content-Type': 'application/json'}});
    fetch(`/api/users/${user.id}`, {method: 'PUT', body: JSON.stringify({action: 'add'}), headers: {'Content-Type': 'application/json'}});
};
