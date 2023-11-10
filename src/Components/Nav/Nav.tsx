import { Title } from "../Title";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <Title />
      </Link>
    </nav>
  );
};
