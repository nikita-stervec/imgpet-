import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
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

interface AsyncThunkConfig {}

const fetchPhotos: AsyncThunk<
  any,
  { query: string; page: number },
  AsyncThunkConfig
> = createAsyncThunk(
  "photo/fetchPhotos",
  async (
    { query, page }: { query: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query,
            page,
            per_page: 10,
          },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Error fetching photos");
    }
  }
);

const fetchPhotosByTag: AsyncThunk<
  any,
  { tag: string; page: number },
  AsyncThunkConfig
> = createAsyncThunk(
  "photo/fetchPhotosByTag",
  async ({ tag, page }: { tag: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: tag,
            page,
            per_page: 10,
          },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Error fetching photos by tag");
    }
  }
);

const fetchPhoto: AsyncThunk<any, string, AsyncThunkConfig> = createAsyncThunk(
  "photo/fetchPhoto",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/${id}`,
        {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Error fetching photo");
    }
  }
);

interface PhotoState {
  photos: Photo[];
  relatedPhotos: Photo[];
  photo: Photo | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
}

const initialState: PhotoState = {
  photos: [],
  relatedPhotos: [],
  photo: null,
  loading: false,
  error: null,
  hasMore: true,
  currentPage: 1,
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    clearRelatedPhotos: state => {
      state.relatedPhotos = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPhotos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.photos = action.payload.results;
        } else {
          state.photos = [...state.photos, ...action.payload.results];
        }
        state.hasMore = action.payload.results.length > 0;
        state.loading = false;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchPhotosByTag.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotosByTag.fulfilled, (state, action) => {
        state.relatedPhotos = [
          ...state.relatedPhotos,
          ...action.payload.results,
        ];
        state.hasMore = action.payload.results.length > 0;
        state.currentPage += 1;
        state.loading = false;
      })
      .addCase(fetchPhotosByTag.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchPhoto.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhoto.fulfilled, (state, action) => {
        state.photo = action.payload;
        state.loading = false;
      })
      .addCase(fetchPhoto.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { clearRelatedPhotos } = photoSlice.actions;
export { fetchPhotos, fetchPhotosByTag, fetchPhoto };
export default photoSlice.reducer;
