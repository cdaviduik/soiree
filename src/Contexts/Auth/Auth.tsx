import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useState } from "react";
import { useFirebase } from "../Firebase";

interface AuthValue {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthValue>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const app = useFirebase();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoading(false);

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // const uid = user.uid;
      console.debug("User is signed in", user);
    } else {
      // User is signed out
      console.debug("User is signed out", user);
    }
  });

  const authValue = {
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
