import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1d--vLnA3iIvkX79qGHKhsfk_Q3Pz1jg",
    authDomain: "skwad-backend.firebaseapp.com",
    projectId: "skwad-backend",
    storageBucket: "skwad-backend.appspot.com",
    messagingSenderId: "236713124180",
    appId: "1:236713124180:web:8ebc0f6c900608018328c1"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);