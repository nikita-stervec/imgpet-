import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import styles from "./Register.module.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/");
      })
      .catch(console.error);
  };
  return (
    <div className={styles["register__wrapper"]}>
      <Form handleClick={handleRegister}>Register</Form>
      <span className={styles["register__span"]}>
        Allready have an account?
        <Link to='/login' className={styles["register__link"]}>
          Login!
        </Link>
      </span>
    </div>
  );
};
