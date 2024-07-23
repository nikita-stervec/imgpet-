import { useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import styles from "./Photo.module.css";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import {
  fetchPhoto,
  fetchPhotosByTag,
  clearRelatedPhotos,
} from "../../store/slices/photoSlice";
import { RootState } from "../../store/store";

type Photo = {
  blur_hash: string;
  urls: {
    regular: string;
  };
  id: string;
  alt_description: string;
  tags: {
    title: string;
  }[];
};

export const Photo = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { photo, relatedPhotos, loading, error, hasMore, currentPage } =
    useSelector((state: RootState) => state.photo);

  useEffect(() => {
    if (id) {
      dispatch(fetchPhoto(id));
      dispatch(clearRelatedPhotos()); 
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (photo && photo.tags.length > 0) {
      dispatch(fetchPhotosByTag({ tag: photo.tags[0].title, page: 1 }));
    }
  }, [photo, dispatch]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPhotoElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          if (photo && photo.tags.length > 0) {
            dispatch(
              fetchPhotosByTag({
                tag: photo.tags[0].title,
                page: currentPage + 1,
              })
            );
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, photo, currentPage, dispatch]
  );

  if (loading && currentPage === 1) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!photo) {
    return <div>No photo found</div>;
  }

  return (
    <div className={styles["photo__wrapper"]}>
      <div className={styles["photo__data"]}>
        <img
          src={photo.urls.regular}
          alt={photo.alt_description}
          width={"600px"}
          height={"300px"}
        />
        <h3>{photo.alt_description}</h3>
      </div>
      <div>
        tags ---
        {photo.tags.map((tag, index) => (
          <span key={index}>
            {index + 1}.{tag.title} ---
          </span>
        ))}
      </div>
      <div className={styles["photo__related"]}>
        {relatedPhotos.map((relatedPhoto, index) => (
          <Card
            url={relatedPhoto.urls.regular}
            key={`${relatedPhoto.id}-${index}`}
            ref={
              relatedPhotos.length === index + 1 ? lastPhotoElementRef : null
            }
            {...relatedPhoto}
            tags={relatedPhoto.tags.map(tag => tag.title)}
          />
        ))}

        {loading && <h1>Loading...</h1>}
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
};
