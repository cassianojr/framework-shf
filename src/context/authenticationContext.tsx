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
import { User } from "../types/User.type";

interface AuthenticationProviderProps {
  children?: React.ReactNode,
}

export interface AuthenticationContextType {
  signed: boolean,
  loading: boolean,
  getUser: () => User,
  signOutFromApp: () => void,
  signInGoogle: () => void,
  createUserEmailPassword: (email: string, password: string, name: string) => Promise<boolean | undefined>,
  signInEmailPassword: (email: string, password: string) => Promise<boolean>,
}

const provider = new GoogleAuthProvider();
export const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [user, setUser] = useState(null as string | null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadStoreAuth = () => {
      const sessionToken = localStorage.getItem("@AuthFirebase:token");
      const sessionUser = localStorage.getItem("@AuthFirebase:user");

      if (sessionToken && sessionUser) {
        setUser(sessionUser);
      }
    };

    loadStoreAuth();
    setLoading(false);
  }, [user, setUser, setLoading]);


  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken as string;
        // The signed-in user info.
        const user = result.user;

        setUser(JSON.stringify(user));

        localStorage.setItem("@AuthFirebase:token", token);
        localStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
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
        console.log("user not logged in");
        return false;
      }

      updateProfile(auth.currentUser, { displayName: name }).then(() => {
        setUser(JSON.stringify(user));

        localStorage.setItem("@AuthFirebase:token", token);
        localStorage.setItem("@AuthFirebase:user", JSON.stringify(user));

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

      setUser(JSON.stringify(user));

      localStorage.setItem("@AuthFirebase:token", token);
      localStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      return true;
    } catch (error) {
      return false;
    }
  }

  function signOutFromApp() {
    signOut(auth).then(() => {
      localStorage.clear();
      setUser(null);
      return navigate('/sign-in');
    }).catch((error) => {
      console.log(error);
      return navigate('/dashboard');
    });
  }

  return (
    <AuthenticationContext.Provider
      value={{
        signed: !!user,
        loading,
        getUser: () => JSON.parse(user as string) as User ?? "",
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
