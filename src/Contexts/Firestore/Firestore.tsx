import { ReactNode, createContext } from "react";
import { Firestore, getFirestore } from "firebase/firestore";
import { useFirebase } from "../Firebase";

export const FirestoreContext = createContext<Firestore | undefined>(undefined);

export const FirestoreProvider = ({ children }: { children: ReactNode }) => {
  const app = useFirebase();
  const db = app && getFirestore(app);

  return (
    <FirestoreContext.Provider value={db}>{children}</FirestoreContext.Provider>
  );
};
