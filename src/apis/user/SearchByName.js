import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://gymbackend-r5nw.onrender.com/user/club?search=";

const initialState = {
    data: [],
    status: "",
    state: "",
    error: "",
    loading: false,
};

export const SearchClubNameHandler = createAsyncThunk(
    "SearchNameSlice/SearchClubNameHandler",
    async (arg) => {
        try {
            const response = await axios.get(api + arg.search);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (err) {
            return {
                message: err.response.data.error,
                status: err.response.status,
            };
        }
    }
);

const SearchNameSlice = createSlice({
    name: "SearchNameSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(SearchClubNameHandler.fulfilled, (state, action) => {
            state.loading = true;
            switch (action.payload.status) {
                case 200:
                    state.data = action.payload.data;
                    state.loading = false;
                    state.error = "";
                    state.state = "Success";
                    state.status = action.payload.status;
                    break;
                case 404:
                    state.data = [];
                    state.loading = false;
                    state.error = action.payload.message;
                    state.state = "Error";
                    state.status = action.payload.status;
                    break;
                default:
                    state.data = [];
                    state.loading = false;
                    state.error = "Errors";
                    state.state = "Error";
                    state.status = action.payload.status;
                    break;
            }
        });
        builder.addCase(SearchClubNameHandler.rejected, (state) => {
            state.data = [];
            state.loading = false;
            state.status = 500;
            state.error = "Server Error";
            state.state = "Rejected";
        });
        builder.addCase(SearchClubNameHandler.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = "";
            state.state = "Pending";
            state.status = "";
        });
    },
});

export default SearchNameSlice.reducer;
