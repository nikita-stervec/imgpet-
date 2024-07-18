import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import axios from "axios";
import { ChangeEvent } from "react";
import { uploadAvatar as uploadAvatarAction } from "../../store/slices/userSlice";
import { Avatar } from "../../components/Avatar/Avatar";

export const User = () => {
  const dispatch = useDispatch();
  const isAuth = useAuth();
  const { email, id, username } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth.isAuth) {
      navigate("/register");
    }
  }, [isAuth.isAuth, navigate]);

  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: apiKey,
          },
        }
      );

      if (response.data.success) {
        const newAvatarUrl = response.data.data.url;
        dispatch(uploadAvatarAction({ avatar: newAvatarUrl }));
      } else {
        console.error("Error uploading avatar:", response.data.error);
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  return (
    <div className={styles["user__wrapper"]}>
      <div className={styles["user__bar"]}>
        <h1>Как стилизовать user-profile? Я тоже не знаю!</h1>
        <hr />
        <div className={styles["user__info"]}>
          <Avatar h='250px' w='250px' />
          <div className={styles["user__info-bar"]}>
            <h3>Информация!</h3>
            Имя: {username}, <br />
            Email: {email}, <br />
            ID: {id},
            <br />
            <br />
            <form>
              <input
                type='file'
                placeholder='Загрузить аватар'
                onChange={handleAvatarUpload}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
