import { Users } from "typings/user/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSlice } from "typings/user/user-slice";

const initialState: UserSlice = {
  users: null,
  errorUsers: null,
  loadingUsers: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<Users | null>) {
      state.users = action.payload;
    },
    setLoadingUsers(state, action: PayloadAction<boolean>) {
      state.loadingUsers = action.payload;
    },
    setErrorUsers(state, action: PayloadAction<string | null>) {
      state.errorUsers = action.payload;
    },
  },
});

export default userSlice;
