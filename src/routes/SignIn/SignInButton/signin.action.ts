import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { redirect } from "react-router";

export const signInAction = async () => {
  // TODO: move code into Auth module
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    console.log("User", user);
  } catch (error) {
    // // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    console.log("Error", error);
    // console.log("Credential from error", credential);
    return { error: "There was a problem signing in. Please try again." };
  }

  return redirect("/events");
};
