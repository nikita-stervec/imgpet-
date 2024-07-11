import { useEffect, useState, useCallback, useRef } from "react";
import styles from "./Main.module.css";
import { Card } from "../../components/Card/Card";
import { usePhotos } from "../../hooks/usePhotos";

export const Main = () => {
  const [query, setQuery] = useState("cats");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [page, setPage] = useState(1);
  const { photos, loading, error, hasMore } = usePhotos(debouncedQuery, page);
  const observer = useRef<IntersectionObserver | null>(null);
  const seenIds = useRef<Set<string>>(new Set());

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
      console.log("rrrrr");
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

  return (
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
              if (photos.length === index + 1) {
                return (
                  <Card
                    url={photo.urls.regular}
                    desc={photo.alt_description}
                    key={photo.id}
                    ref={lastPhotoElementRef}
                  />
                );
              } else {
                return (
                  <Card
                    url={photo.urls.regular}
                    desc={photo.alt_description}
                    key={photo.id}
                  />
                );
              }
            })
          ) : (
            <div>No photos to display</div>
          )}
        </div>
        {loading && page > 1 && <div>Loading more...</div>}
      </div>
    </div>
  );
};
