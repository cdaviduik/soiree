import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Components";
import { useAuth } from "../../Repo";
import { SignInButton } from "./SignInButton";
import styles from "./SignIn.module.css";

export const SignIn = () => {
  const { user, initializing } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/events");
    }
  }, [user, navigate]);

  return (
    <div className={styles.SignIn}>
      {initializing && <Loading />}
      {!initializing && !user && <SignInButton />}
      {user && `Hello ${user.displayName} 👋🏻`}
    </div>
  );
};
