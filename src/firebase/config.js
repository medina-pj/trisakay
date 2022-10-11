import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyADnswY4EKNU10AN4S66BZktaY2ZZlwk8E',
  authDomain: 'trisakay-26bef.firebaseapp.com',
  projectId: 'trisakay-26bef',
  storageBucket: 'trisakay-26bef.appspot.com',
  messagingSenderId: '397608850952',
  appId: '1:397608850952:web:48f1c83b74570f456963bd',
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init firebase auth
const auth = getAuth();

export { db, auth };
