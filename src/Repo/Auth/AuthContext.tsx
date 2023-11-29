import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import auth from "./Auth";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";

export type User = FirebaseUser;

interface AuthValue {
  user: User | null;
  initializing: boolean;
}

export const AuthContext = createContext<AuthValue>({
  user: null,
  initializing: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  auth.authStateReady().then(() => setInitializing(false));
  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const authValue = useMemo(
    () => ({
      user,
      initializing,
    }),
    [user, initializing]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
