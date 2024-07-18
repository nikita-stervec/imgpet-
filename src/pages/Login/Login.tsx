import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Form } from "../../components/Form/Form";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../store/slices/userSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (email: string, pass: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        user;
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/");
      })
      .catch(() => alert("Wrong Email or Password"));
  };

  return (
    <div className={styles["login__wrapper"]}>
      <Form handleClick={handleLogin} label='you may skip it!' require={false}>
        Login
      </Form>
      <span className={styles["login__span"]}>
        Don't have an account?
        <Link to='/register' className={styles["login__link"]}>
          Register!
        </Link>
      </span>
    </div>
  );
};
