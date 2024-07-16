import styles from "./LikedPhotos.module.css";
import { Card } from "../../components/Card/Card";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LikedPhotos = () => {
  const { isAuth, email } = useAuth();
  const likedPic = useSelector((state: RootState) => state.user.likedPic);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  });

  console.log(likedPic);

  return (
    <div className={styles["liked__wrapper"]}>
      <div className={styles["liked__welcome"]}>Welcome {email}!</div>
      <div>you liked photos is...</div>
      {likedPic.length > 0 ? (
        likedPic.map(({url, id}, index) => <Card key={index} url={url} id={id} />)
      ) : (
        <h1>No liked photos</h1>
      )}
    </div>
  );
};
