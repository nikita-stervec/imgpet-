import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import photoReducer from "./slices/photoSlice";
import sessionStorageMiddleware from "./middleware/sessionStorageMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    photo: photoReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sessionStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
