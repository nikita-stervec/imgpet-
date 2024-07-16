import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
  likedPic: { id: string; url: string }[];
}

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("authState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: UserState) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("authState", serializedState);
  } catch (e) {
    console.error(e);
  }
};

const initialState: UserState = loadState() || {
  email: null,
  token: null,
  id: null,
  likedPic: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ email: string; token: string; id: string }>
    ) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      saveState(state);
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.likedPic = [];
      saveState(state);
    },
    getUser(state) {
      state.email;
      state.token;
      state.id;
    },
    likePhoto(state, action: PayloadAction<{ url: string; id: string }>) {
      const { id, url } = action.payload;
      if (!state.likedPic.some(photo => photo.id === id && photo.url === url)) {
        state.likedPic.push({ id, url });
        saveState(state);
      }
    },
  },
});

export const { setUser, removeUser, getUser, likePhoto } = userSlice.actions;

export default userSlice.reducer;
