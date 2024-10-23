import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../service/userService";

const userService = new UserService('http://localhost:8080/api/user');

export const getUser = createAsyncThunk(
    'user/getUser',
    async (token, { rejectWithValue }) => {
        try {
            console.log("userSlice getUser", token);
            const response = await userService.getCurrentLoggedInUser(token);
            console.log("userSlice getUser response", response.data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ token, userData }, { rejectWithValue }) => {
        try {
            
            
            const response = await userService.updateUser(token, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await userService.deleteUser(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    user: {
        id: null,
        fullName: "",
        email: "",
        role: ""
    },
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
        }});
export default userSlice.reducer;