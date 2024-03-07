import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
