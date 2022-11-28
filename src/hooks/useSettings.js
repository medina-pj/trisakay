import { useState, useEffect } from 'react';

// config
import { db } from '../firebase/config';

// firebase/firestore
import { collection, query, onSnapshot, doc, setDoc } from 'firebase/firestore';

const useSettings = () => {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    let ref = collection(db, 'Rate_Collection');
    let qry = query(ref);

    const unsub = onSnapshot(qry, async snapshot => {
      let results = [];

      for (const settingDoc of snapshot.docs) {
        results.push({
          ...settingDoc.data(),
          id: settingDoc.id,
        });
      }

      setDocuments(results);
    });

    return () => unsub();
  }, []);

  const onUpdate = async (id, data) => {
    try {
      setError('');

      const docRef = doc(db, 'Rate_Collection', id);

      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      setError(error);
    }
  };

  return { error, documents, onUpdate };
};

export default useSettings;
