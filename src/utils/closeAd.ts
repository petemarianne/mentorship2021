import { Ad, User } from '../interfaces';

export const closeAd = async (ad: Ad, user: User): Promise<void> => {
    fetch(`/api/closead/${ad.id}`, {method: 'PUT'});
    fetch(`/api/updateusersactiveads/${user.id}`, {method: 'PUT', body: JSON.stringify({action: 'remove'}), headers: {'Content-Type': 'application/json'}});
};
