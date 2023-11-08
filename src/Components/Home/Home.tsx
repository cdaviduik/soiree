import "./Home.css";
import { useAuth } from "../../Contexts/Auth";
import { SignInButton } from "../SignIn/SignInButton";
import { Loading } from "../Loading";

export const Home = () => {
  const { user, loading } = useAuth();

  return (
    <div className="Home">
      {loading && <Loading />}
      {!loading && !user && <SignInButton />}
      {user && `Hello ${user.displayName} 👋🏻`}
    </div>
  );
};
