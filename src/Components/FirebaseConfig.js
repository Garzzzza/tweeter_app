import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCpSVStetvVaCVPpnwK1dEu0S0JqDmAk4Y",
    authDomain: "itc-tweeter-1bc9e.firebaseapp.com",
    projectId: "itc-tweeter-1bc9e",
    storageBucket: "itc-tweeter-1bc9e.appspot.com",
    messagingSenderId: "1032076093406",
    appId: "1:1032076093406:web:5e930e8376bc85bff51f4f"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const fireBaseStorage = getStorage(firebaseApp)


export { firebaseApp, db, auth, fireBaseStorage };
