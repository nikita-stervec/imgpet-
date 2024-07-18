import { useEffect, useState, useCallback, useRef } from "react";
import styles from "./Main.module.css";
import { Card } from "../../components/Card/Card";
import { usePhotos } from "../../hooks/usePhotos";
import { useAuth } from "../../hooks/useAuth";

export const Main = () => {
  const [query, setQuery] = useState("cats");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [page, setPage] = useState(1);
  const { photos, loading, error, hasMore } = usePhotos(debouncedQuery, page);
  const observer = useRef<IntersectionObserver | null>(null);
  const seenIds = useRef<Set<string>>(new Set());

  const { isAuth, email } = useAuth();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
      seenIds.current.clear();
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
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

  if (loading && page === 1) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return isAuth ? (
    <div>
      <div className={styles["main__wrapper"]}>
        <h3>Welcome! {email}!</h3>
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
            photos.map((photo, index) => {
              const uniqueKey = `${photo.id}-${index}`;
              if (photos.length === index + 1) {
                return (
                  <Card
                    blur_hash={photo.blur_hash}
                    tags={photo.tags.map(tag => tag.title)}
                    id={photo.id}
                    url={photo.urls.regular}
                    desc={photo.alt_description}
                    key={uniqueKey}
                    ref={lastPhotoElementRef}
                  />
                );
              } else {
                return (
                  <Card
                    blur_hash={photo.blur_hash}
                    tags={photo.tags.map(tag => tag.title)}
                    id={photo.id}
                    url={photo.urls.regular}
                    desc={photo.alt_description}
                    key={uniqueKey}
                  />
                );
              }
            })
          ) : (
            <div>No photos to display</div>
          )}
        </div>
        {loading && page > 1 && (
          <h1 className={styles["main__loading"]}>Loading more...</h1>
        )}
      </div>
    </div>
  ) : (
    <div>
      <div className={styles["main__wrapper"]}>
        <h3>Welcome! User!</h3>
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
            photos.map((photo, index) => {
              const uniqueKey = `${photo.id}-${index}`;
              if (photos.length === index + 1) {
                return (
                  <Card
                    blur_hash={photo.blur_hash}
                    tags={photo.tags.map(tag => tag.title)}
                    id={photo.id}
                    url={photo.urls.regular}
                    desc={photo.alt_description}
                    key={uniqueKey}
                    ref={lastPhotoElementRef}
                  />
                );
              } else {
                return (
                  <Card
                    blur_hash={photo.blur_hash}
                    tags={photo.tags.map(tag => tag.title)}
                    id={photo.id}
                    url={photo.urls.regular}
                    desc={photo.alt_description}
                    key={uniqueKey}
                  />
                );
              }
            })
          ) : (
            <div>No photos to display</div>
          )}
        </div>
        {loading && page > 1 && (
          <h1 className={styles["main__loading"]}>Loading more...</h1>
        )}
      </div>
    </div>
  );
};
