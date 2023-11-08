import "./Home.css";
import { useAuth } from "../../Contexts/Auth";
import { SignIn } from "../SignIn";
import { Loading } from "../Loading";

export const Home = () => {
  const { user, loading } = useAuth();
  console.log("user", user);

  return (
    <div className="Home">
      {loading && <Loading />}
      {!loading && !user && <SignIn />}
      {user && `Hello ${user.displayName} 👋🏻`}
    </div>
  );
};
