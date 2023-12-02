import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../Firebase";
import { User } from ".";

const auth = getAuth(app);

export const getCurrentUser = async () => {
  await auth.authStateReady();
  return auth.currentUser;
};

export const getUser = async (uid: string): Promise<User> => {
  const functions = getFunctions();
  const getUserFn = httpsCallable(functions, "getUser");
  const { data } = await getUserFn({ uid });
  return data as User;
};

export const getUsers = async (uids: string[]): Promise<User[]> => {
  const functions = getFunctions();
  const getUsersFn = httpsCallable(functions, "getUsers");
  const { data } = await getUsersFn(uids);
  return data as User[];
};
export const signOut = () => firebaseSignOut(auth);

export default auth;
