import { useState, useEffect } from 'react';

// config
import { auth, db } from '../firebase/config';

// firebase/auth
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';

// firebase/firestore
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';

import useAuthContext from './useAuthContext';

const useAdmin = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      let ref = collection(db, 'Admin_Collection');
      let qry = query(ref);

      const unsub = onSnapshot(qry, snapshot => {
        let results = [];

        for (const doc of snapshot.docs) {
          results.push({
            ...doc.data(),
            id: doc.id,
          });
          // if (doc.data().authUID !== user.auth.uid) {
          //   results.push({
          //     ...doc.data(),
          //     id: doc.id,
          //   });
          // }
        }

        results.sort((a, b) => b.createdAt - a.createdAt);

        setDocuments(results);
      });

      return () => unsub();
    }
  }, [user]);

  const signUp = async payload => {
    try {
      setError(null);

      // create firebase auth account
      const { user } = await createUserWithEmailAndPassword(auth, payload.email, payload.password);

      // save account details
      const accountPayload = {
        authUID: user.uid,
        firstname: payload.firstname,
        lastname: payload.lastname,
        contactNumber: payload.contactNumber,
        emailAddress: payload.email,
        createdAt: Date.now(),
        userType: payload.userType,
      };

      const createAccount = await addDoc(collection(db, 'Admin_Collection'), accountPayload);

      return {
        auth: user,
        account: {
          id: createAccount.id,
          ...accountPayload,
        },
      };
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      setError(null);

      const res = await signOut(auth);

      return res;
    } catch (err) {
      setError(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);

      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // get account details
      const ref = collection(db, 'Admin_Collection');
      const q = query(ref, where('authUID', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length === 0) {
        throw new Error('No account details found.');
      }

      const account = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      return {
        auth: user,
        account: account[0],
      };
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteRecord = async id => {
    try {
      setError(null);

      const ref = doc(db, 'Admin_Collection', id);

      await deleteDoc(ref);

      return null;
    } catch (err) {
      setError(err.message);
    }
  };

  return { error, signUp, logout, login, documents, deleteRecord };
};

export default useAdmin;
