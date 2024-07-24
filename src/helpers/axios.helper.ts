import axios, { AxiosResponse } from "axios";

const fetchPhotosInstance = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
  },
});

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

interface SearchPhotosResponse {
  results: Photo[];
  total: number;
  total_pages: number;
}

export const getPhotos = async (
  query: string,
  page: number
): Promise<AxiosResponse<SearchPhotosResponse>> => {
  const response = await fetchPhotosInstance.get("search/photos", {
    params: {
      query,
      page,
      per_page: 10,
    },
  });
  return response;
};

export const getPhotosByTag = async (
  query: string,
  page: number
): Promise<AxiosResponse<SearchPhotosResponse>> => {
  const response = await fetchPhotosInstance.get("search/photos", {
    params: {
      query: query,
      page: page,
      per_page: 10,
    },
  });
  return response;
};

export const getPhoto = async (id: string): Promise<AxiosResponse<Photo>> => {
  const response = await fetchPhotosInstance.get(`photos/${id}`);
  return response;
};
