import { useState, useEffect } from 'react';

import { db } from '../firebase/config';

import { collection, getDoc, query, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const usePassenger = () => {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    let ref = collection(db, 'passengers');
    let qry = query(ref);

    const unsub = onSnapshot(qry, async snapshot => {
      let results = [];

      for (const passengerDoc of snapshot.docs) {
        const accountRef = doc(db, 'accounts', passengerDoc.data().accountID);
        const accountSnap = await getDoc(accountRef);

        results.push({
          ...passengerDoc.data(),
          ...accountSnap.data(),
          id: passengerDoc.id,
        });
      }

      results.sort((a, b) => b.createdAt - a.createdAt);

      setDocuments(results);
    });

    return () => unsub();
  }, []);

  const create = async payload => {
    try {
      setError(null);

      const passengerPayload = {
        accountID: payload.accountID,
        files: payload.files || [],
        status: 'pending',
        createdAt: Date.now(),
      };

      const createPassenger = await addDoc(collection(db, 'passengers'), passengerPayload);

      return {
        ...passengerPayload,
        id: createPassenger.id,
      };
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteRecord = async (account, passenger) => {
    try {
      setError(null);

      const deleteAccount = doc(db, 'accounts', account);
      const deletePassenger = doc(db, 'riders', passenger);

      await deleteDoc(deleteAccount);
      await deleteDoc(deletePassenger);

      return null;
    } catch (err) {
      setError(err.message);
    }
  };

  return { error, create, documents, deleteRecord };
};

export default usePassenger;
