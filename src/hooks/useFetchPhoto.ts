import axios from "axios";
import { useState, useEffect } from "react";

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

export const useFetchPhoto = (id: string) => {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [currentTag, setCurrentTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/${id}`,
          {
            headers: {
              Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
            },
          }
        );
        setPhoto(response.data);
        setCurrentTag(response.data.tags[0]?.title || null);
      } catch (err) {
        setError("Error fetching photo");
      } finally {
        setLoading(false);
      }
    };
    fetchPhoto();
  }, [id]);

  return { photo, currentTag, loading, error };
};
