import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useAuth } from "../../hooks/useAuth";
import { removeUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../Avatar/Avatar";

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
          <Link to='/user' className={styles["header__profile"]}>
            <Avatar w='50px' h='50px' />
            <Button>My Profile</Button>
          </Link>
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
