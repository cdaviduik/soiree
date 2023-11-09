import "./SignIn.css";
import { useAuth } from "../../Contexts/Auth";
import { SignInButton } from "./SignInButton";
import { Loading } from "../../Components/Loading";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const SignIn = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/events");
    }
  }, [user, navigate]);

  return (
    <div className="SignIn">
      {loading && <Loading />}
      {!loading && !user && <SignInButton />}
      {user && `Hello ${user.displayName} 👋🏻`}
    </div>
  );
};
