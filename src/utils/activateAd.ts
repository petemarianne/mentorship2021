import { Ad, User } from '../interfaces';

export const activateAd = async (ad: Ad, user: User): Promise<void> => {
    fetch(`/api/activatead/${ad.id}`, {method: 'PUT'});
    fetch(`/api/updateusersactiveads/${user.id}`, {method: 'PUT', body: JSON.stringify({action: 'add'}), headers: {'Content-Type': 'application/json'}});
};
