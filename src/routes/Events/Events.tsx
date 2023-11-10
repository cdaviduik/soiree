import styles from "./Events.module.css";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../Contexts/Auth";
import { FirebaseProvider } from "../../Contexts/Firebase";
import { FirestoreProvider } from "../../Contexts/Firestore";
import { Nav } from "../../Components/Nav";

export const Events = () => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <FirestoreProvider>
          <div className={styles.Events}>
            <Nav />
            <Outlet />
          </div>
        </FirestoreProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
};
