import { useContext } from "react";
import { FirebaseContext } from "./Firebase";

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
