import firebase from 'firebase';

import { mockFirebase, mockGoogleAuthProvider } from './mock';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

export const fb =
  process.env.NODE_ENV !== 'test'
    ? firebase.initializeApp(config)
    : mockFirebase;
export const googleProvider =
  process.env.NODE_ENV !== 'test'
    ? new firebase.auth.GoogleAuthProvider()
    : mockGoogleAuthProvider;
export const userSession = { user: {} };

// Verify user auth session presence
if (process.env.NODE_ENV !== 'test') {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      userSession.user = user;
    }
  });
}

export default fb;
