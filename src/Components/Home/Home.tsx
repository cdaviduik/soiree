import "./Home.css";
import { useAuth } from "../../Contexts/Auth";
import { SignIn } from "../SignIn";
import { Loading } from "../Loading";

export const Home = () => {
  const { user, loading } = useAuth();
  console.log("user", user);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Home">
      {!user && <SignIn />}
      {user && `Hello ${user.displayName} 👋🏻`}
    </div>
  );
};
