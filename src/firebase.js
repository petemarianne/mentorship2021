import firebase from 'firebase';
import 'firebase/storage';

export const app = firebase.initializeApp({
    apiKey: "AIzaSyBmZoEYgK4Wz80IxGfCsWIGqQscTZ01wEc",
    authDomain: "dog-shop-8c56c.firebaseapp.com",
    projectId: "dog-shop-8c56c",
    databaseURL: "https://dog-shop-8c56c.eur3.firebaseio.com",
    storageBucket: "dog-shop-8c56c.appspot.com",
    messagingSenderId: "55519712783",
    appId: "1:55519712783:web:edf84e3daf99f48633f57a"
});

export const db = app.firestore()
