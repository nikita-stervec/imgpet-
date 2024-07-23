import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string | null;
  username: string | null;
  token: string | null;
  id: string | null;
  avatar: string | null;
  likedPic: { id: string; url: string }[];
}

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("authState");
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState: UserState = loadState() || {
  email: null,
  username: null,
  token: null,
  id: null,
  avatar: null,
  likedPic: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        username: string;
        email: string;
        token: string;
        id: string;
        avatar: string | "/avatar.jpg";
      }>
    ) {
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.avatar = "/avatar.jpg";
      state.email = null;
      state.username = null;
      state.token = null;
      state.id = null;
      state.likedPic = [];
    },
    likePhoto(state, action: PayloadAction<{ url: string; id: string }>) {
      const { id, url } = action.payload;
      if (!state.likedPic.some(photo => photo.id === id && photo.url === url)) {
        state.likedPic.push({ id, url });
      }
    },
    uploadAvatar(state, action: PayloadAction<{ avatar: string }>) {
      state.avatar = action.payload.avatar;
    },
  },
});

export const { setUser, removeUser, likePhoto, uploadAvatar } =
  userSlice.actions;

export default userSlice.reducer;
