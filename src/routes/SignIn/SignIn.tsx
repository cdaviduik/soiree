import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "../../Components";
import { useAuth } from "../../Repo";
import { SignInButton } from "./SignInButton";
import styles from "./SignIn.module.css";

export const SignIn = () => {
  const { user, initializing } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user) {
      const nextUrl = searchParams.get("nextUrl");
      navigate(nextUrl || "/events");
    }
  }, [user, navigate, searchParams]);

  return (
    <div className={styles.SignIn}>
      {initializing && <Loading />}
      {!initializing && !user && <SignInButton />}
      {user && `Hello ${user.displayName} 👋🏻`}
    </div>
  );
};
