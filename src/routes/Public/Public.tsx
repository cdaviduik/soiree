import "./Public.css";
import { AuthProvider } from "../../Contexts/Auth";
import { FirebaseProvider } from "../../Contexts/Firebase";
import { SignIn } from "../SignIn";

export const Public = () => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <div>
          <h1 className="Title">Soiree</h1>
          <div>A place for your parties</div>
          <SignIn />
        </div>
      </AuthProvider>
    </FirebaseProvider>
  );
};
