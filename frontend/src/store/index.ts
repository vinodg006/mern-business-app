import { configureStore } from "@reduxjs/toolkit";
import authSlice from "modules/auth/store/slices/authSlice";
import { apiSlice } from "./api/apiSlice";
import testSlice from "modules/test/store/slices/testSlice";
import userSlice from "modules/user/store/slices/userSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    test: testSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
