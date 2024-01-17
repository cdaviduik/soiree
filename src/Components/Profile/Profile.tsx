import styles from "./Profile.module.css";
import { User } from "../../Repo";
import { useState } from "react";

interface Props {
  user: User;
}

export const Profile = ({ user }: Props) => {
  const [showPhoto, setShowPhoto] = useState(true);

  const imageError = () => {
    setShowPhoto(false);
  };

  return (
    <div className={styles.Profile}>
      {showPhoto && user.photoURL && (
        <img src={user.photoURL} onError={imageError} />
      )}
      {user.displayName && <span>{user.displayName}</span>}
    </div>
  );
};
