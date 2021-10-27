import { Ad, User } from '../interfaces';
import { db } from '../firebase';

export const closeAd = async (ad: Ad, user: User): Promise<void> => {
    await db.collection('dogAds').doc(ad.docID).set({
        ...ad,
        status: 'closed',
        saleDate: null,
        closingDate: new Date(),
    });
    await db.collection('users').doc(user.name).set({
        ...user,
        activeAds: user.activeAds - 1,
    });
};
