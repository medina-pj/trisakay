import { useState, useEffect } from 'react';

// config
import { db } from '../firebase/config';

// firebase/firestore
import { collection, query, where, onSnapshot, doc, setDoc, getDoc } from 'firebase/firestore';

const useRider = () => {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    let ref = collection(db, 'User_Collection');
    let qry = query(ref, where('user_role', '==', 2));

    const unsub = onSnapshot(qry, async snapshot => {
      let results = [];

      for (const riderDoc of snapshot.docs) {
        const vehicleRef = doc(db, 'Vehicle_Collection', riderDoc.id);
        const vehicleSnap = await getDoc(vehicleRef);

        results.push({
          ...riderDoc.data(),
          ...vehicleSnap.data(),
          id: riderDoc.id,
        });
      }

      setDocuments(results);
    });

    return () => unsub();
  }, []);

  const onApprove = async id => {
    try {
      setError('');

      const docRef = doc(db, 'User_Collection', id);

      await setDoc(
        docRef,
        {
          user_status: 'Approved',
        },
        { merge: true }
      );
    } catch (error) {
      setError(error);
    }
  };

  const onDecline = async id => {
    try {
      setError('');

      const docRef = doc(db, 'User_Collection', id);

      await setDoc(
        docRef,
        {
          user_status: 'Declined',
        },
        { merge: true }
      );
    } catch (error) {
      setError(error);
    }
  };

  return { error, documents, onApprove, onDecline };
};

export default useRider;
