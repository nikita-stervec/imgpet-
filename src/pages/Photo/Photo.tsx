import { useParams } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import styles from "./Photo.module.css";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

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

const API_KEY = "oQJHD2gxZ0xVufp-8NeMaz2H7moiCRvYEYy9dGoQ0iw";

export const Photo = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPhotos, setRelatedPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [currentTag, setCurrentTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/${id}`,
          {
            headers: {
              Authorization: `Client-ID ${API_KEY}`,
            },
          }
        );
        setPhoto(response.data);
        setCurrentTag(response.data.tags[0].title);
        setLoading(false);
      } catch (err) {
        setError("Error fetching photo");
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  useEffect(() => {
    if (currentTag) {
      const fetchRelatedPhotos = async () => {
        try {
          const response = await axios.get(
            "https://api.unsplash.com/search/photos",
            {
              headers: {
                Authorization: `Client-ID ${API_KEY}`,
              },
              params: {
                query: currentTag,
                per_page: 10,
                page: page,
              },
            }
          );
          setRelatedPhotos(prevPhotos => [
            ...prevPhotos,
            ...response.data.results,
          ]);
          setHasMore(response.data.results.length > 0);
        } catch (err) {
          setError("Error fetching related photos");
        }
      };

      fetchRelatedPhotos();
    }
  }, [currentTag, page]);

  const observer = useRef<IntersectionObserver | null>(null);
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id]);

  if (loading) {
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
        {relatedPhotos.map((relatedPhoto, index) => {
          if (relatedPhotos.length === index + 1) {
            return (
              <Card
                key={relatedPhoto.id}
                id={relatedPhoto.id}
                url={relatedPhoto.urls.regular}
                desc={relatedPhoto.alt_description}
                ref={lastPhotoElementRef}
              />
            );
          } else {
            return (
              <Card
                key={relatedPhoto.id}
                id={relatedPhoto.id}
                url={relatedPhoto.urls.regular}
                desc={relatedPhoto.alt_description}
              />
            );
          }
        })}
        {loading && <h1>Loading...</h1>}
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
};
