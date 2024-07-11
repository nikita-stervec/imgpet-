import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./Register.module.css";

export const Register = () => {
  return (
    <div className={styles["register__wrapper"]}>
      <form className={styles["register__form"]}>
        <input type='email' placeholder='email' />
        <input type='password' placeholder='password' />
        <Button className={styles["register__btn"]}>register</Button>
      </form>
      <span className={styles["register__span"]}>
        Allready have an account?<Link to='/login' className={styles['register__link']}>Login!</Link>
      </span>
    </div>
  );
};
