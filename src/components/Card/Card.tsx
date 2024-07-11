import { forwardRef } from "react";
import styles from "./Card.module.css";
import { Button } from "../Button/Button";

interface ICard {
  url: string;
  desc?: string;
}

export const Card = forwardRef<HTMLDivElement, ICard>(({ desc, url }, ref) => {
  return (
    <div className={styles["card__wrapper"]} ref={ref}>
      <img
        className={styles["card__image"]}
        src={url}
        alt={desc}
        width={400}
        height={250}
      />
      <Button>
        <img
          onClick={() => alert("123")}
          className={styles["card__like"]}
          src='/like-right-svgrepo-com.svg'
          alt='like'
          width={"36px"}
        />
      </Button>
    </div>
  );
});
