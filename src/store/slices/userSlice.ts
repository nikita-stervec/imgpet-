import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  url: null,
  token: null,
  id: null,
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
    },
    likePhoto(state, action) {
      state.email = null;
      state.url = action.payload.url;
    },
  },
});

export const { setUser, removeUser, likePhoto } = userSlice.actions;

export default userSlice.reducer;
