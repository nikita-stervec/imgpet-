import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import {
  getPhotos,
  getPhotosByTag,
  getPhoto,
} from "../../helpers/axios.helper";

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

interface FetchPhotosResponse {
  results: Photo[];
}

const fetchPhotos: AsyncThunk<
  FetchPhotosResponse,
  { query: string; page: number },
  AsyncThunkConfig
> = createAsyncThunk(
  "photo/fetchPhotos",
  async (
    { query, page }: { query: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await getPhotos(query, page);
      return response.data;
    } catch (err) {
      return rejectWithValue("Error fetching photos");
    }
  }
);

const fetchPhotosByTag: AsyncThunk<
  FetchPhotosResponse,
  { tag: string; page: number },
  AsyncThunkConfig
> = createAsyncThunk(
  "photo/fetchPhotosByTag",
  async ({ tag, page }: { tag: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await getPhotosByTag(tag, page);
      return response.data;
    } catch (err) {
      return rejectWithValue("Error fetching photos by tag");
    }
  }
);

const fetchPhoto: AsyncThunk<Photo, string, AsyncThunkConfig> =
  createAsyncThunk(
    "photo/fetchPhoto",
    async (id: string, { rejectWithValue }) => {
      try {
        const response = await getPhoto(id);
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
