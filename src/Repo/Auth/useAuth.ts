import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * @returns User or throws an error.
 */
export const useUser = () => {
  const { user } = useAuth();
  if (!user) {
    throw new Error("User is expected to exist.");
  }

  return user;
};
