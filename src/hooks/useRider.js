import { useState, useEffect } from 'react';

// config
import { db } from '../firebase/config';

// firebase/firestore
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const useRider = () => {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    let ref = collection(db, 'User_Collection');
    let qry = query(ref, where('user_role', '==', 1));

    const unsub = onSnapshot(qry, async snapshot => {
      let results = [];

      for (const riderDoc of snapshot.docs) {
        results.push({
          ...riderDoc.data(),
          id: riderDoc.id,
        });
      }

      // results.sort((a, b) => b.createdAt - a.createdAt);

      setDocuments(results);
    });

    return () => unsub();
  }, []);

  return { error, documents };
};

export default useRider;
