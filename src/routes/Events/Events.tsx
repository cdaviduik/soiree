import styles from "./Events.module.css";
import { Outlet } from "react-router-dom";
import { Nav } from "../../Components/Nav";

export const Events = () => {
  return (
    <div className={styles.Events}>
      <Nav />
      <Outlet />
    </div>
  );
};
