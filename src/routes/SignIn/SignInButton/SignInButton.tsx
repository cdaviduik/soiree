import { useState } from "react";
import { Loading } from "../../../Components/Loading";
import { signInWithGoogle } from "../../../Repo";

export const SignInButton = () => {
  const [loading, setLoading] = useState(false);

  const signInAction = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log("Error signing in", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} onClick={signInAction}>
      {loading ? <Loading text="Signing In" /> : "Sign In with Google"}
    </button>
  );
};
