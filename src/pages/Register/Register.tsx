import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import styles from "./Register.module.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = sessionStorage.getItem("authState");
    if (userData) {
      dispatch(setUser(JSON.parse(userData)));
    }
  }, [dispatch]);

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
      .catch(() => alert("user is allready registered"));
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
