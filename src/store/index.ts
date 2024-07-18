// src/store.js

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import sessionStorageMiddleware from "./middleware/sessionStorageMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sessionStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
