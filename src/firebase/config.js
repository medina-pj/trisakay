import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC_tnztUAGuLetcTALTj7ST1oqVoFWg--E',
  authDomain: 'trisakay-68a7f.firebaseapp.com',
  databaseURL: 'https://trisakay-68a7f-default-rtdb.firebaseio.com',
  projectId: 'trisakay-68a7f',
  storageBucket: 'trisakay-68a7f.appspot.com',
  messagingSenderId: '493367178376',
  appId: '1:493367178376:web:477a5b6e1c185a361e1b3d',
};

// init firebase
const app = initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init firebase auth
const auth = getAuth();

// init firebase storage
const storage = getStorage(app);

export { db, auth, storage };
