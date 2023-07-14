import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const api = "https://gymbackend-r5nw.onrender.com/user/clubs";
// const api = "http://localhost:8000/user/clubs";


const initialState = {
  data: [],
  status: "",
  state: "",
  error: "",
  loading: false,
};

export const GetClubsHandler = createAsyncThunk(
  "ClubsSlice/GetClubsHandler",
  async () => {
    try {
      const response = await axios.get(api);
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

const ClubsSlice = createSlice({
  name: "ClubsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetClubsHandler.fulfilled, (state, action) => {
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
    builder.addCase(GetClubsHandler.rejected, (state) => {
      state.data = [];
      state.loading = false;
      state.status = 500;
      state.error = "Server Error";
      state.state = "Rejected";
    });
    builder.addCase(GetClubsHandler.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = "";
      state.state = "Pending";
      state.status = "";
    });
  },
});

export default ClubsSlice.reducer;
