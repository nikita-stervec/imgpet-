import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./Login.module.css";

export const Login = () => {
  return (
    <div className={styles["login__wrapper"]}>
      <form className={styles["login__form"]}>
        <input type='email' placeholder='email' />
        <input type='password' placeholder='password' />
        <Button className={styles["login__btn"]}>Log in</Button>
      </form>
      <span className={styles["login__span"]}>
        Don't have an account?
        <Link to='/register' className={styles["login__link"]}>
          Register!
        </Link>
      </span>
    </div>
  );
};
