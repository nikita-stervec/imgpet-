import axios from "axios";

const fetchPhotosInstance = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
  },
});

export const getPhotos = async (query: string, page: number) => {
  const response = await fetchPhotosInstance.get("search/photos", {
    params: {
      query,
      page,
      per_page: 10,
    },
  });
  return response;
};

export const getPhotosByTag = async (query: string, page: number) => {
  const response = await fetchPhotosInstance.get("search/photos", {
    params: {
      query: query,
      page: page,
      per_page: 10,
    },
  });
  return response;
};

export const getPhoto = async (id: string) => {
  const response = await fetchPhotosInstance.get(`photos/${id}`);
  return response;
};
