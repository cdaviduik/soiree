import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";

export const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log("User", user);
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Error", error);
        console.log("Credential from error", credential);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <button disabled={loading} onClick={signInWithGoogle}>
      Sign In with Google
    </button>
  );
};

// string, number, big int, object (array, object, date), boolean, null, undefined, symbol
