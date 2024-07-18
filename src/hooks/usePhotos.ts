import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

type Photo = {
  urls: {
    regular: string;
  };
  id: string;
  alt_description: string;
};

export const usePhotos = (query: string, page: number) => {
  const API_KEY = "oQJHD2gxZ0xVufp-8NeMaz2H7moiCRvYEYy9dGoQ0iw";
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
              Authorization: `Client-ID ${API_KEY}`,
            },
            params: {
              query: query,
              per_page: "10",
              orientation: "landscape",
              page: page,
            },
          }
        );

        console.log(response.data);

        setPhotos(prevPhotos => {
          const newPhotos = response.data.results.filter(
            (photo: Photo) => !prevPhotos.some(p => p.id === photo.id)
          );
          return [...prevPhotos, ...newPhotos];
        });
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
