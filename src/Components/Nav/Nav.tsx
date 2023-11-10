import styles from "./Nav.module.css";
import { SignOutButton } from "../SignOutButton";
import { Title } from "../Title";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className={styles.Nav}>
      <Link to="/">
        <Title />
      </Link>
      <SignOutButton />
    </nav>
  );
};
