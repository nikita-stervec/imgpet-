import { forwardRef, useState } from "react";
import styles from "./Card.module.css";
import { Button } from "../Button/Button";
import { likePhoto } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";

interface ICard {
  url: string;
  desc?: string;
  id: string;
  tags?: string[];
  blur_hash?: string;
}

export const Card = forwardRef<HTMLDivElement, ICard>(
  ({ desc, url, id, blur_hash }, ref) => {
    const dispatch = useDispatch();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleLike = () => {
      dispatch(likePhoto({ url, id }));
    };

    return (
      <div className={styles["card__wrapper"]} ref={ref}>
        <Link to={`/photo/${id}`}>
          <div className={styles["card__image-container"]}>
            {!imageLoaded && blur_hash ? (
              <Blurhash
                hash={blur_hash}
                width={400}
                height={250}
                resolutionX={64}
                resolutionY={64}
                punch={5}
              />
            ) : null}
            <img
              className={styles["card__image"]}
              src={url}
              alt={desc}
              width={400}
              height={250}
              onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? "block" : "none" }}
            />
          </div>
        </Link>
        <div className={styles["card__bottom"]}>
          <Button className={styles["card__button"]}>
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
  }
);
