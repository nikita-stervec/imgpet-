import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useAuth } from "../../hooks/useAuth";
import { removeUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  return isAuth ? (
    <div className={styles["header__wrapper"]}>
      <div className={styles["header__bar"]}>
        <Link to='/' className={styles["header__home"]}>
          Home
        </Link>
        <Link to={"/liked"}>
          <Button className={styles["header__liked__auth"]}>liked pics</Button>
        </Link>
        <div className={styles["header__auth"]}>
          <img src='/avatar.jpg' alt='avatar' width={30} height={30} />
          <Button>My Profile</Button>
          <Button
            onClick={() => {
              dispatch(removeUser()), navigate("/");
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles["header__wrapper"]}>
      <div className={styles["header__bar"]}>
        <Link to='/' className={styles["header__home"]}>
          Home
        </Link>
        <Link to={"/liked"}>
          <Button className={styles["header__liked"]}> liked pics</Button>
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
