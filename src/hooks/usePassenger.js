import { useState, useEffect } from 'react';

import { db } from '../firebase/config';

import { collection, query, onSnapshot, where } from 'firebase/firestore';

const usePassenger = () => {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    let ref = collection(db, 'User_Collection');
    let qry = query(ref, where('user_role', '==', 1));

    const unsub = onSnapshot(qry, async snapshot => {
      let results = [];

      for (const passengerDoc of snapshot.docs) {
        results.push({
          ...passengerDoc.data(),
          id: passengerDoc.id,
        });
      }

      setDocuments(results);
    });

    return () => unsub();
  }, []);

  return { error, documents };
};

export default usePassenger;
