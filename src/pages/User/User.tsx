import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";

export const User = () => {
  const isAuth = useAuth();
  const { email, token, id } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth.isAuth) {
      navigate("/register");
    }
  });

  return (
    <div className={styles["user__wrapper"]}>
      <div className={styles["user__bar"]}>
        <h1>mail - {email}</h1>
        <hr />
        <h1>id - {id}</h1>
        <hr />
        <h4>token - {token}</h4>
      </div>
    </div>
  );
};
