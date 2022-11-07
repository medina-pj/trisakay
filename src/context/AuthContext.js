import { createContext, useReducer, useEffect } from 'react';

import { db, auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async user => {
      if (!user) {
        dispatch({
          type: 'AUTH_IS_READY',
          payload: null,
        });

        unsub();

        return;
      }

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

      dispatch({
        type: 'AUTH_IS_READY',
        payload: {
          auth: user,
          account: account[0],
        },
      });

      unsub();
    });
  }, []);

  console.log('AuthContext state:', state);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
