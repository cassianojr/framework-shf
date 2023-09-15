import { createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { auth } from "../services/firebaseConfig";

interface AuthenticationProviderProps {
  children?: React.ReactNode,
}

export interface AuthenticationContextType{
  signed: boolean,
  user: any,
  signOutFromApp: () => void,
  signInGoogle: () => void,
  createUserEmailPassword: (email: string, password: string, name: string) => Promise<boolean | undefined>,
  signInEmailPassword: (email: string, password: string) => Promise<boolean>,
}

const provider = new GoogleAuthProvider();
export const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [user, setUser] = useState(null as any);

  const navigate = useNavigate();

  useEffect(() => {
    const loadStoreAuth = () => {
      const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
      const sessionUser = sessionStorage.getItem("@AuthFirebase:user");

      if (sessionToken && sessionUser) {
        setUser(sessionUser);
      }
    };

    loadStoreAuth();
  });

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken as string;
        // The signed-in user info.
        const user = result.user;

        setUser(user);

        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      }).catch((error) => {
        console.log(error);
      });
  }

  const createUserEmailPassword = async (email: string, password: string, name: string) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await credential.user.getIdToken();
      const user = credential.user;

      if (!auth || !auth.currentUser) {
        console.log("bug");
        return;
      }

      updateProfile(auth.currentUser, { displayName: name }).then(() => {
        setUser(user);

        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));

        //redirect to /
        return navigate('/dashboard');

      }).catch((err) => console.log(err));

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const signInEmailPassword = async (email: string, password: string) => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const token = await credential.user.getIdToken();
      const user = credential.user;

      setUser(user);

      sessionStorage.setItem("@AuthFirebase:token", token);
      sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      return true;
    } catch (error) {
      return false;
    }
  }

  function signOutFromApp() {
    signOut(auth).then(() => {
      sessionStorage.clear();
      setUser(null);
      return navigate('/');
    }).catch((error) => {
      console.log(error);
      return navigate('/');
    });
  }

  return (
    <AuthenticationContext.Provider
      value={{
        signed: !!user,
        user,
        signOutFromApp,
        signInGoogle,
        createUserEmailPassword,
        signInEmailPassword,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )

};

export default AuthenticationProvider;
