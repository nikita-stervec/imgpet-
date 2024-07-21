import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchPhotosByTag = createAsyncThunk(
  'photo/fetchPhotosByTag',
  async (tag: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/random`, {
        params: {
          count: 10,
          query: tag,
        },
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue("Error fetching photos by tag");
    }
  }
);
