import {
  type User,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import {
  useContext,
  type ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";
import { auth } from "@lib/firebase";
import { googleProvider } from "@service/firebaseProviders";

interface AuthContextProps {
  children: ReactNode;
}

type AuthContext = {
  session: User | null;
  isLoading: boolean;
  getToken: () => Promise<string | undefined>;
  signInWithGoogle: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContext>({
  session: null,
  isLoading: true,
  getToken: async () => await undefined,
  signInWithGoogle: () => 1,
  signOut: async () => await undefined,
});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [session, setSession] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSession(auth.currentUser);

    const unsubscribe = onAuthStateChanged(auth, (currentSession) => {
      setIsLoading(false);
      console.log(currentSession);
      setSession(currentSession);
    });

    return () => unsubscribe();
  }, []);

  const getToken = async () => {
    const token = await auth.currentUser?.getIdToken();

    return token;
  };

  const signInWithGoogle = () => {
    signInWithRedirect(auth, googleProvider);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        getToken,
        session,
        isLoading,
        signInWithGoogle,
        signOut: logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);

  if (ctx) {
    return ctx;
  }

  return {
    session: null,
    isLoading: true,
    getToken: async () => await undefined,
    signInWithGoogle: () => 1,
    signOut: async () => await undefined,
  };
}
