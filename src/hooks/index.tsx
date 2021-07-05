import { createContext, useContext, FC, useState , useEffect } from 'react';

import { firebase, auth } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

interface AppContextProps {
  user: User;
  signInWithGoogle: () => Promise<void>;
}

const AppContext = createContext({} as AppContextProps)

export const AppProvider: FC = ({ children }) => {

  const [user, setUser] = useState<User>({} as User);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    try {
      const response = await auth.signInWithPopup(provider);

      if (!response.user) {
        throw new Error("User not found.");
      }

      const { displayName, photoURL, uid } = response.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });

    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      try {
        if (!user) {
          return;
        }
  
        const { displayName, photoURL, uid } = user;
  
        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google account.");
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      } catch (error) {
        console.log(error)
      }
    });

    return () => unsubscribe();
  }, [])

  return (
    <AppContext.Provider 
      value={{
        user,
        signInWithGoogle
      }}
    >
      {children}
    </AppContext.Provider>
  );

}

export const useApp = () => {
  return useContext(AppContext);
}