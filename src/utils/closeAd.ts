import { Ad, User } from '../interfaces';

export const closeAd = async (ad: Ad, user: User): Promise<void> => {
    fetch(`/api/ads/${ad.id}`, {method: 'PUT', body: JSON.stringify({status: 'closed'}), headers: {'Content-Type': 'application/json'}});
    fetch(`/api/users/${user.id}`, {method: 'PUT', body: JSON.stringify({action: 'remove'}), headers: {'Content-Type': 'application/json'}});
};
