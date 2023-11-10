import { useContext } from "react";
import { FirestoreContext } from "./Firestore";

export const useFirestore = () => {
  const db = useContext(FirestoreContext);
  if (!db) {
    throw Error("Firestore unavailable");
  }

  return db;
};
