import { forwardRef } from "react";
import styles from "./Card.module.css";
import { Button } from "../Button/Button";
import { likePhoto } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";

interface ICard {
  url: string;
  desc?: string;
}

export const Card = forwardRef<HTMLDivElement, ICard>(({ desc, url }, ref) => {

  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likePhoto({url}))
  }

  return (
    <div className={styles["card__wrapper"]} ref={ref}>
      <img
        className={styles["card__image"]}
        src={url}
        alt={desc}
        width={400}
        height={250}
      />
      <div className={styles['card__bottom']}>
        <Button className={styles['card__button']}>
          <img
            onClick={handleLike}
            className={styles["card__like"]}
            src='/like-right-svgrepo-com.svg'
            alt='like'
            width={"36px"}
          />
        </Button>
      </div>
    </div>
  );
});
