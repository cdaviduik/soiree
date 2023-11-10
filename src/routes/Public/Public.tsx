import styles from "./Public.module.css";
import { SignIn } from "../SignIn";
import { Title } from "../../Components/Title";

export const Public = () => {
  return (
    <div className={styles.Public}>
      <h1>
        <Title />
      </h1>
      <div>A place for your parties</div>
      <SignIn />
    </div>
  );
};
