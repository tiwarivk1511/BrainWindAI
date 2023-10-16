// Required Import
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

//web app's Firebase configuration
// For Firebase JS SDK v9 and later, measurementId is optional
// web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkxAP8cte9B3bW0gTDhMcGP7g2WqPvkAE",
  authDomain: "brainwindai.firebaseapp.com",
  projectId: "brainwindai",
  storageBucket: "brainwindai.appspot.com",
  messagingSenderId: "12033677807",
  appId: "1:12033677807:web:69db9bd94b339da94cbe1a",
  measurementId: "G-MQBP55HK24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize the authentication and firestore services
const auth = getAuth(app);
const firestore = getFirestore(app);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

export {app, auth, firestore, analytics };