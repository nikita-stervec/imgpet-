import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";

export const Header = () => {
  return (
    <div className={styles["header__wrapper"]}>
      <div className={styles["header__bar"]}>
        <Link to='/' className={styles["header__home"]}>
          Home
        </Link>
        <Link to={"/liked"}>
          <Button>liked pics</Button>
        </Link>
        <div className={styles["header__auth"]}>
          <Link to={"/login"}>
            <Button>login</Button>
          </Link>
          <Link to={"/register"}>
            <Button>register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
