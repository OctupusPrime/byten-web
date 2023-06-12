import {
  useContext,
  type ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";

import {
  type User,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  getRedirectResult,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import type { FirebaseError } from "firebase/app";

import { notifications } from "@mantine/notifications";

import { googleProvider, githubProvider } from "@service/firebaseProviders";
import { auth } from "@lib/firebase";

interface AuthContextProps {
  children: ReactNode;
}

type AuthContext = {
  session: User | null;
  isLoading: boolean;
  getToken: () => Promise<string | undefined>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContext>({
  session: null,
  isLoading: true,
  getToken: async () => await undefined,
  signInWithGoogle: async () => await undefined,
  signInWithGithub: async () => await undefined,
  signOut: async () => await undefined,
});

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [session, setSession] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setUserSession = (session: User | null) => {
    setSession(session);
    setIsLoading(false);
  };

  useEffect(() => {
    const currUser = auth.currentUser;

    if (currUser) {
      setUserSession(currUser);
    }

    getRedirectResult(auth)
      .then((result) => {
        if (!result) return;

        const user = result.user;

        setUserSession(user);
      })
      .catch((err: FirebaseError) => {
        if (err.code !== "auth/account-exists-with-different-credential")
          return notifications.show({
            title: "Cannot authorize account",
            message: "Try again later.",
            color: "red",
            autoClose: false,
          });

        if (!err.customData)
          return notifications.show({
            title: "Account exists with different credential",
            message: "Try to use different auth provider",
            color: "red",
            autoClose: false,
          });

        const isGoogleVerify = (
          (err.customData?._tokenResponse as any)?.verifiedProvider as string[]
        )?.find((el) => el === "google.com");

        if (isGoogleVerify)
          return notifications.show({
            title: "Account exists with different credential",
            message: `Try to use google auth with ${err.customData.email} email.`,
            color: "red",
            autoClose: false,
          });

        notifications.show({
          title: "Account exists with different credential",
          message: "Try to use different auth provider",
          color: "red",
          autoClose: false,
        });
      });

    const unsubscribe = onAuthStateChanged(auth, setUserSession);

    return () => unsubscribe();
  }, []);

  const getToken = async () => {
    const token = await auth.currentUser?.getIdToken();

    return token;
  };

  const signInWithGoogle = async () => {
    await setPersistence(auth, browserSessionPersistence);
    signInWithRedirect(auth, googleProvider);
  };

  const signInWithGithub = async () => {
    await setPersistence(auth, browserSessionPersistence);
    signInWithRedirect(auth, githubProvider);
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
        signInWithGithub,
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
    signInWithGoogle: async () => await undefined,
    signInWithGithub: async () => await undefined,
    signOut: async () => await undefined,
  };
}
