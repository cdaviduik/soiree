import {
  getAuth,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../Firebase";

const auth = getAuth(app);

export const getUser = async () => {
  await auth.authStateReady();
  return auth.currentUser;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};
export const signOut = () => firebaseSignOut(auth);

export default auth;
