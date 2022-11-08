import { useState, useEffect } from 'react';

// config
import { db } from '../firebase/config';

// firebase/firestore
import { collection, getDoc, query, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export default function useBooking() {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    let ref = collection(db, 'Booking_Collection');
    let qry = query(ref);

    const unsub = onSnapshot(qry, async snapshot => {
      let results = [];

      for (const bookingDoc of snapshot.docs) {
        let rider = {};
        let passenger = {};

        if (bookingDoc.data().booking_passengerID) {
          const passengerRef = doc(db, 'User_Collection', bookingDoc.data().booking_passengerID);
          const passengerSnap = await getDoc(passengerRef);
          console.log(passengerSnap.data());

          passenger = { ...passengerSnap.data() };
        }

        if (bookingDoc.data().booking_riderID) {
          const riderRef = doc(db, 'User_Collection', bookingDoc.data().booking_riderID);
          const riderSnap = await getDoc(riderRef);
          rider = { ...riderSnap.data() };
        }

        results.push({
          ...bookingDoc.data(),
          passenger,
          rider,
          id: bookingDoc.id,
        });
      }

      // results.sort(
      //   (a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
      // );

      setDocuments(results);
    });

    return () => unsub();
  }, []);

  return { error, documents };
}
