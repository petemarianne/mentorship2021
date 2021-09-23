// Import the functions you need from the SDKs you need
import { initializeApp} from 'firebase/firebase-app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiScHwm0ZVRuOoBj9viN1wvSVi9-CqZ70",
    authDomain: "dog-shop-1302d.firebaseapp.com",
    databaseURL: "https://dog-shop-1302d.firebaseio.com",
    projectId: "dog-shop-1302d",
    storageBucket: "dog-shop-1302d.appspot.com",
    messagingSenderId: "382762356997",
    appId: "1:382762356997:web:36ffb02d1fa1a42ab9676c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;