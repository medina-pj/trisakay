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

const useAccount = userType => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (userType && user) {
      let ref = collection(db, 'accounts');
      let qry = query(ref, where('userType', '==', userType));

      const unsub = onSnapshot(qry, snapshot => {
        let results = [];

        for (const doc of snapshot.docs) {
          if (doc.data().authUID !== user.auth.uid) {
            results.push({
              ...doc.data(),
              id: doc.id,
            });
          }
        }

        results.sort((a, b) => b.createdAt - a.createdAt);

        setDocuments(results);
      });

      return () => unsub();
    }
  }, [userType, user]);

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

      const createAccount = await addDoc(collection(db, 'accounts'), accountPayload);

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
      const ref = collection(db, 'accounts');
      const q = query(ref, where('authUID', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length === 0) {
        throw new Error('No account details found.');
      }

      const account = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (account[0].userType !== 'admin') {
        throw new Error('Account is unauthorized.');
      }

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

      const ref = doc(db, 'accounts', id);

      await deleteDoc(ref);

      return null;
    } catch (err) {
      setError(err.message);
    }
  };

  return { error, signUp, logout, login, documents, deleteRecord };
};

export default useAccount;
