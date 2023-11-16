import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { signOut, useAuth } from "../../Repo";
import { Loading } from "../Loading";

export const SignOutButton = () => {
  const { user, initializing } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initializing && !user) {
      navigate("/");
    }
  }, [user, initializing, navigate]);

  const signOutAction = async () => {
    setLoading(true);
    try {
      if (!initializing) {
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
    <button disabled={loading} onClick={signOutAction}>
      {loading ? <Loading text="Signing Out" /> : "Sign Out"}
    </button>
  );
};
