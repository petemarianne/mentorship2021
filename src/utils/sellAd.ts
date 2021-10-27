import { Ad, User } from '../interfaces';
import { db } from '../firebase';

export const sellAd = async (ad: Ad, user: User): Promise<void> => {
    await db.collection('dogAds').doc(ad.docID).set({
        ...ad,
        status: 'sold',
        saleDate: new Date(),
        closingDate: null,
    });
    await db.collection('users').doc(user.name).set({
        ...user,
        activeAds: user.activeAds - 1,
    });
};
