import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

//initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;

//Need to Add Firebase security rules in your Firebase Console:
//Go to Authentication > Rules
//Set up basic rules for your database:
//Try registering a new user
//Try logging in with the registered user
//Verify that the user appears in your Firebase Console under Authentication > Users
