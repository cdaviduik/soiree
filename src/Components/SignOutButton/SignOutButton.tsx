import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut, useAuth } from "../../Repo";
import { Loading } from "../Loading";
import styles from "./SignOutButton.module.css";

export const SignOutButton = () => {
  const { user, initializing } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!initializing && !user) {
      const nextUrl = `/?nextUrl=${location.pathname}`;
      navigate(nextUrl);
    }
  }, [user, initializing, navigate, location.pathname]);

  const signOutAction = async () => {
    setLoading(true);
    try {
      if (initializing) {
        throw "Cannot sign out when Auth is unavailable";
      }
      await signOut();
    } catch (error) {
      console.error("Error signing out", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={styles.SignOutButton}
      disabled={loading}
      onClick={signOutAction}
    >
      {loading ? <Loading text="Signing Out" /> : "Sign Out"}
    </button>
  );
};
