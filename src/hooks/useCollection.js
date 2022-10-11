import { useState, useEffect } from 'react';
import { db } from '../firebase/config';

// firebase imports
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const useCollection = c => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let ref = collection(db, c);
    let qry = query(ref, orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(qry, snapshot => {
      let results = [];

      snapshot.docs.forEach(doc => {
        results.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      setDocuments(results);
    });

    return () => unsub();
  }, [c]);

  return { documents };
};

export default useCollection;
