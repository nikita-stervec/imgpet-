import { useEffect, useState, useCallback, useRef } from "react";
import styles from "./Main.module.css";
import { Card } from "../../components/Card/Card";
import { usePhotos } from "../../hooks/usePhotos";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const Main = () => {
  const [query, setQuery] = useState("porshe 911");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [page, setPage] = useState(1);
  const { photos, loading, hasMore } = usePhotos(debouncedQuery, page);
  const observer = useRef<IntersectionObserver | null>(null);
  const seenIds = useRef<Set<string>>(new Set());
  const username = useSelector((state: RootState) => state.user.username);
  const { isAuth } = useAuth();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query || "block");
      setPage(1);
      seenIds.current.clear();
    }, 2000);

    return () => clearTimeout(handler);
  }, [query]);

  const lastPhotoElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div className={styles["main__wrapper"]}>
        <h3>Welcome! {isAuth ? username : "User"}!</h3>
        <form className={styles["main__form"]} action=''>
          <input
            type='text'
            placeholder='query theme'
            value={query}
            onChange={handleQueryChange}
          />
        </form>
      </div>
      <div className={styles["main__content__wrapper"]}>
        <div className={styles["main__content"]}>
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <Card
                url={photo.urls.regular}
                key={`${photo.id}-${index}`}
                ref={photos.length === index + 1 ? lastPhotoElementRef : null}
                {...photo}
                tags={photo.tags.map(tag => tag.title)}
              />
            ))
          ) : (
            <div>No photos to display</div>
          )}
        </div>
        {loading && page > 1 && (
          <h1 className={styles["main__loading"]}>Loading more...</h1>
        )}
      </div>
    </>
  );
};
