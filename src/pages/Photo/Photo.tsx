import { useParams } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import styles from "./Photo.module.css";
import { useEffect, useState, useCallback, useRef } from "react";
import { useFetchPhoto } from "../../hooks/useFetchPhoto";
import { usePhotosByTag } from "../../hooks/usePhotosByTag";

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
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const { photo, currentTag, loading: photoLoading } = useFetchPhoto(id);
  const { relatedPhotos, hasMore, loading: relatedLoading, error: relatedError } = usePhotosByTag(currentTag, page);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPhotoElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id]);

  if (photoLoading) {
    return <div>Loading...</div>;
  }

  if (error || relatedError) {
    return <div>Error: {error || relatedError}</div>;
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

        {relatedLoading && <h1>Loading...</h1>}
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
};
