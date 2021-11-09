import { Ad, User } from '../interfaces';

export const sellAd = async (ad: Ad, user: User): Promise<void> => {
    fetch(`/api/ads/${ad.id}`, {method: 'PUT', body: JSON.stringify({action: 'sell'}), headers: {'Content-Type': 'application/json'}});
    fetch(`/api/updateusersactiveads/${user.id}`, {method: 'PUT', body: JSON.stringify({action: 'remove'}), headers: {'Content-Type': 'application/json'}});
};
