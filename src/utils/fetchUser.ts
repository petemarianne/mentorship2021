import { db } from '../firebase';
import { User } from '../interfaces';

export const fetchUser = async (id: number): Promise<User> => {
    const usersCollection = await db.collection('users').where('id','==',`seller${id}`).get();
    return usersCollection.docs.map((doc) => {return {
        activeAds: doc.data().activeAds,
        avatar: doc.data().avatar,
        date: doc.data().date,
        email: doc.data().email,
        id: doc.data().id,
        name: doc.data().name,
        phone: doc.data().phone,
    };})[0];
};
