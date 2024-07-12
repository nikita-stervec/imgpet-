import styles from "./LikedPhotos.module.css";
import { Card } from "../../components/Card/Card";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const LikedPhotos = () => {
  const { isAuth, email } = useAuth();
  const likedUrls = useSelector((state: RootState) => state.user.likedUrls);

  return isAuth ? (
    <div className={styles["liked__wrapper"]}>
      <div className={styles['liked__welcome']}>Welcome {email}!</div>
      <div>you liked photos is...</div>
      {likedUrls.length > 0 ? (
        likedUrls.map((url, index) => <Card key={index} url={url} />)
      ) : (
        <h1>No liked photos</h1>
      )}
    </div>
  ) : (
    <div className={styles["liked__wrapper"]}>
      <h1>auth first!</h1>
    </div>
  );
};
