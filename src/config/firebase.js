import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const {
    VITE_BACKEND_API_KEY,
    VITE_BACKEND_AUTH_DOMAIN,
    VITE_BACKEND_PROJECT_ID,
    VITE_BACKEND_STORAGE_BUCKET,
    VITE_BACKEND_MESSAGING_SENDER_ID,
    VITE_BACKEND_APP_ID,
} = import.meta.env;
  
const firebaseConfig = {
    apiKey: VITE_BACKEND_API_KEY,
    authDomain: VITE_BACKEND_AUTH_DOMAIN,
    projectId: VITE_BACKEND_PROJECT_ID,
    storageBucket: VITE_BACKEND_STORAGE_BUCKET,
    messagingSenderId: VITE_BACKEND_MESSAGING_SENDER_ID,
    appId: VITE_BACKEND_APP_ID,
};  

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);