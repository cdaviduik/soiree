import { ReactNode, createContext, useContext } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBONo15aPSvZsuh_69HwN6_SKIZNVdXaYE",
  authDomain: "soiree-37875.firebaseapp.com",
  projectId: "soiree-37875",
  storageBucket: "soiree-37875.appspot.com",
  messagingSenderId: "141169672481",
  appId: "1:141169672481:web:2774c3b61caf32a4ecbe60",
};

const FirebaseContext = createContext<FirebaseApp | undefined>(undefined);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const app = initializeApp(firebaseConfig);

  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};
