import { useEffect, useState } from "react";
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

export const usePhotosByTag = (currentTag: string, page: number) => {
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [relatedPhotos, setRelatedPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentTag) return;
    const fetchRelatedPhotos = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            headers: {
              Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
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
      } finally {
        setLoading(false);
      }
    };
    fetchRelatedPhotos();
  }, [currentTag, page]);

  return { relatedPhotos, hasMore, loading, error };
};
