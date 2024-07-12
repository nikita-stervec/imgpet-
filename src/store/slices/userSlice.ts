import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
  likedUrls: string[];
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
  likedUrls: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.likedUrls = [];
    },
    likePhoto(state, action: PayloadAction<{ url: string }>) {
      if (!state.likedUrls.includes(action.payload.url)) {
        state.likedUrls.push(action.payload.url);
      }
    },
    dislikePhoto(state, action: PayloadAction<{ url: string }>) {
      state.likedUrls = state.likedUrls.filter(
        url => url !== action.payload.url
      );
    },
  },
});

export const { setUser, removeUser, likePhoto, dislikePhoto } =
  userSlice.actions;

export default userSlice.reducer;
