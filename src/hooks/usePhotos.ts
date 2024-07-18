import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

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

export const usePhotos = (query: string, page: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPhotos([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            headers: {
              Authorization: `Client-ID ${
                import.meta.env.VITE_UNSPLASH_API_KEY
              }`,
            },
            params: {
              query: query,
              per_page: "10",
              orientation: "landscape",
              page: page,
            },
          }
        );

        const newPhotos = response.data.results.filter(
          (photo: Photo) => !photos.some(p => p.id === photo.id)
        );

        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        setHasMore(response.data.results.length > 0);
        setLoading(false);
      } catch (err) {
        const error = err as AxiosError;
        setLoading(false);
        setError(error.message);
      }
    };

    fetchPhotos();
  }, [query, page]);

  return { photos, loading, error, hasMore };
};
