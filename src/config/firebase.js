import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_BACKEND_API_KEY,
    authDomain: import.meta.env.VITE_BACKEND_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_BACKEND_PROJECT_ID,
    storageBucket: import.meta.env.VITE_BACKEND_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_BACKEND_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_BACKEND_APP_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);