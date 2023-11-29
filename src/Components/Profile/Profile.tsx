import styles from "./Profile.module.css";
import { User } from "../../Repo";

interface Props {
  user: User;
}

export const Profile = ({ user }: Props) => {
  return (
    <div className={styles.Profile}>
      {user.photoURL && <img src={user.photoURL} />}
      {user.displayName && <span>{user.displayName}</span>}
    </div>
  );
};
