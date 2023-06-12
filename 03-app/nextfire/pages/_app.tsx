import { useEffect, useState } from 'react';
// Components
import Navbar from '../layouts/Navbar';
import { Toaster } from 'react-hot-toast';
// Library
import { UserContext } from '../lib/context';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firebase';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
// Styles
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;
    unsubscribe = onSnapshot(
      doc(db, 'users', user),
      (doc) => {
        console.log(doc);
      }
    )
    if(user) {
      try {
        unsubscribe = onSnapshot(
          doc(db, 'users', user.uid),
          (doc) => {
            console.log(doc);
          }
        )
        
        // unsubscribe = ref.onSnapshot();
      } catch (err) {
        
      }
    }
  }, [user])

  return (
    <UserContext.Provider value={{user: {}, username: 'Parker'}}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp
