import { initializeApp, getApps} from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Prevent Secondary Init
const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Auth
export const auth = getAuth(firebase_app);
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: "select_account"
});
export const signIn = () => {
  signInWithRedirect(auth, googleAuthProvider)
  .then(response => {
    console.log(response);
    return response
  })
};

export const db = getFirestore(firebase_app);

export const storage = getStorage(firebase_app);