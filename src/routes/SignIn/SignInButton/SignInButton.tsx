import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Loading } from "../../../Components/Loading";

import { useAuth } from "../../../Contexts/Auth";

export const SignInButton = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const signInAction = async () => {
    setLoading(true);
    // TODO: move code into Auth module
    const provider = new GoogleAuthProvider();

    try {
      if (!auth) {
        throw "Cannot sign out when Auth is unavailable";
      }
      await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      // The signed-in user info.
      // const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // console.log("User", user);
    } catch (error) {
      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Error signing in", error);
      // console.log("Credential from error", credential);
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
