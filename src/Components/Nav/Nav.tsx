import styles from "./Nav.module.css";
import { SignOutButton } from "../SignOutButton";
import { Title } from "../Title";
import { Link } from "react-router-dom";
import { useAuth } from "../../Repo";
import { Profile } from "../Profile";

export const Nav = () => {
  const { user } = useAuth();
  const path = user ? "/events" : "/";

  return (
    <nav className={styles.Nav}>
      <Link to={path}>
        <Title />
      </Link>
      {user && <Profile user={user} />}
      <SignOutButton />
    </nav>
  );
};
