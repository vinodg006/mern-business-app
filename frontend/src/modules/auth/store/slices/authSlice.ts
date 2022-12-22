import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthResponse } from "typings/auth/auth-service";
import { AuthSlice } from "typings/auth/auth-slice";
import { State } from "typings/state";

const initialState: AuthSlice = { user: null, token: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthResponse>) => {
            const { user, access_token } = action.payload
            state.user = user
            state.token = access_token
        },
        logOut: (state) => {
            state.user = null
            state.token = null
        }
    },
})


export default authSlice;

export const selectCurrentUser = (state: State) => state.auth.user
export const selectCurrentToken = (state: State) => state.auth.token