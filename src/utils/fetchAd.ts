import { db } from '../firebase';
import { Ad } from '../interfaces';

export const fetchAd = async (id: string): Promise<Ad> => {
    const adsCollection = await db.collection('dogAds').where('id','==',`ad${id}`).get();
    return adsCollection.docs.map((doc) => {return {
        id: doc.data().id,
        title: doc.data().title,
        description: doc.data().description,
        city: doc.data().city,
        country: doc.data().country,
        date: doc.data().date,
        picture: doc.data().picture,
        sellerID: doc.data().sellerID,
        status: doc.data().status,
        price: doc.data().price,
        docID: doc.id,
    };})[0];
};
