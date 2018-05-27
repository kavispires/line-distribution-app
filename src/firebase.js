import firebase from 'firebase';

// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// };

const config = {
  apiKey: "AIzaSyDzl2BYRNABWc_K-MO4nKIBEZVjLLFzY6Q",
  authDomain: "line-distribution.firebaseapp.com",
  databaseURL: "https://line-distribution.firebaseio.com",
  projectId: "line-distribution",
  storageBucket: "line-distribution.appspot.com",
  messagingSenderId: "301160617788"
};

const base = firebase.initializeApp(config);
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { base, googleProvider };
