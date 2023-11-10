import styles from "./SignIn.module.css";
import { useAuth } from "../../Contexts/Auth";
import { SignInButton } from "./SignInButton";
import { Loading } from "../../Components/Loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/events");
    }
  }, [user, navigate]);

  return (
    <div className={styles.SignIn}>
      {loading && <Loading />}
      {!loading && !user && <SignInButton />}
      {user && `Hello ${user.displayName} 👋🏻`}
    </div>
  );
};
