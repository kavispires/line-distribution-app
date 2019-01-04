import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

export const fb = firebase.initializeApp(config);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const userSession = { user: {} };

// Verify user auth session presence
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    userSession.user = user;
  }
});

export default fb;
