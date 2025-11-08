import { configureStore } from "@reduxjs/toolkit";
import { schoolApi } from "../Api/SchoolApi";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [schoolApi.reducerPath]: schoolApi.reducer, // RTK Query API
    auth: authReducer, // auth slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(schoolApi.middleware),
});
