import { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { fetchPhotos } from "../../store/slices/photoSlice";
import { RootState } from "../../store/store";
import styles from './Main.module.css'
import { useAuth } from "../../hooks/useAuth";
import { Card } from "../../components/Card/Card";

export const Main = () => {
  const [query, setQuery] = useState("porshe 911");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [page, setPage] = useState(1);
  const seenIds = useRef<Set<string>>(new Set());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();
  const observer = useRef<IntersectionObserver | null>(null);
  const { photos, loading, hasMore } = useSelector((state: RootState) => state.photo);
  const { isAuth } = useAuth();
  const username = useSelector((state: RootState) => state.user.username);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(query || "block");
      setPage(1);
      seenIds.current.clear();
      dispatch(fetchPhotos({ query: query || "block", page: 1 }));
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, dispatch]);

  useEffect(() => {
    dispatch(fetchPhotos({ query: debouncedQuery, page }));
  }, [debouncedQuery, page, dispatch]);


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
                desc={photo.alt_description}
                id={photo.id}
                blur_hash={photo.blur_hash}
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
