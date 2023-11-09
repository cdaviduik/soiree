import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../Contexts/Auth";
import { FirebaseProvider } from "../../Contexts/Firebase/Firebase";

export const Events = () => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <div id="Events">
          <h1 className="Title">Soiree</h1>
          <div>A place for your parties</div>
          <Outlet />
        </div>
      </AuthProvider>
    </FirebaseProvider>
  );
};
