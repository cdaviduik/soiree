import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/Auth";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { Loading } from "../Loading";

export const SignOutButton = () => {
  const { auth, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const signOutAction = async () => {
    setLoading(true);
    try {
      if (!auth) {
        throw "Cannot sign out when Auth is unavailable";
      }
      await signOut(auth);
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
