import styles from "./Events.module.css";
import { Outlet } from "react-router-dom";
import { Loading, Nav } from "../../Components";
import { useAuth } from "../../Repo";

export const Events = () => {
  const { initializing } = useAuth();
  return (
    <div className={styles.Events}>
      <Nav />
      {initializing && (
        <div className={styles.Loading}>
          <Loading />
        </div>
      )}
      {!initializing && <Outlet />}
    </div>
  );
};
