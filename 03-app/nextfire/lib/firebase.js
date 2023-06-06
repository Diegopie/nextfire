import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5Hr49Y7ewd6TJam27J0UjrPuDygV9Dio",
  authDomain: "learn-firebase-36a6f.firebaseapp.com",
  projectId: "learn-firebase-36a6f",
  storageBucket: "learn-firebase-36a6f.appspot.com",
  messagingSenderId: "126489367154",
  appId: "1:126489367154:web:5c6ab4502b5c5644b128eb",
  measurementId: "G-EPYBWX7ZJ7"
};

// Prevent Next from initializing the app more than once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();