import { useState, useEffect } from 'react';

// config
import { db } from '../firebase/config';

// firebase/firestore
import { collection, getDoc, query, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export const useRider = () => {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    let ref = collection(db, 'riders');
    let qry = query(ref);

    const unsub = onSnapshot(qry, async snapshot => {
      let results = [];

      for (const riderDoc of snapshot.docs) {
        const accountRef = doc(db, 'accounts', riderDoc.data().accountID);
        const accountSnap = await getDoc(accountRef);

        results.push({
          ...riderDoc.data(),
          ...accountSnap.data(),
          id: riderDoc.id,
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

      const riderPayload = {
        accountID: payload.accountID,
        licenseNumber: payload.licenseNumber,
        plateNumber: payload.plateNumber,
        status: 'pending',
        createdAt: Date.now(),
      };

      const createRider = await addDoc(collection(db, 'riders'), riderPayload);

      return {
        ...riderPayload,
        id: createRider.id,
      };
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteRecord = async (account, rider) => {
    try {
      setError(null);

      const deleteAccount = doc(db, 'accounts', account);
      const deleteRider = doc(db, 'riders', rider);

      await deleteDoc(deleteAccount);
      await deleteDoc(deleteRider);

      return null;
    } catch (err) {
      setError(err.message);
    }
  };

  return { error, create, documents, deleteRecord };
};

export default useRider;
