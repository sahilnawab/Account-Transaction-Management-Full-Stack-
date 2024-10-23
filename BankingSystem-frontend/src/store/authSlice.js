import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: sessionStorage.getItem('token'),
    isLoggedIn: !!sessionStorage.getItem('token'),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            state.isLoggedIn = true;
            sessionStorage.setItem('token', action.payload); // Save token to session storage
        },
        logout: (state) => {
            state.token = null;
            state.isLoggedIn = false;
            sessionStorage.removeItem('token'); // Remove token from session storage
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
