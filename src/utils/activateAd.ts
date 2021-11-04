import { Ad, User } from '../interfaces';

export const activateAd = async (ad: Ad, user: User): Promise<void> => {
    fetch(`/api/activatead/${ad.id}`, {method: 'PUT'}).then(response => response.json()).then(data => console.log(data.message));
    fetch(`/api/updateusersactiveads/${user.id}`, {method: 'PUT', body: JSON.stringify({action: 'add'}), headers: {'Content-Type': 'application/json'}}).then(response => response.json()).then(data => console.log(data.message));
};
