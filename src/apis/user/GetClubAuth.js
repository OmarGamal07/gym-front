import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const api = "https://gymbackend-r5nw.onrender.com/user/club_auth/";
// const api = "http://localhost:8000/user/club_auth/";

const initialState = {
  data: [],
  status: "",
  state: "",
  error: "",
  loading: false,
};
const cookies = new Cookies();

export const ClubAuthHandler = createAsyncThunk(
  "ClubAuthSlice/ClubAuthHandler",
  async (arg) => {
    try {
      const response = await axios.get(api + arg.id + `?lat=${arg.lat}&long=${arg.long}`, {headers: {authorization: `Bearer ${cookies.get('_auth_token')}`}});
      return {
        data: response.data,
        status: response.status,
      };
    } catch (err) {
      return {
        message: err.response.data.message,
        status: err.response.status,
      };
    }
  }
);

const ClubAuthSlice = createSlice({
  name: "ClubAuthSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClubAuthHandler.fulfilled, (state, action) => {
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
    builder.addCase(ClubAuthHandler.rejected, (state) => {
      state.data = [];
      state.loading = false;
      state.status = 500;
      state.error = "Server Error";
      state.state = "Rejected";
    });
    builder.addCase(ClubAuthHandler.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = "";
      state.state = "Pending";
      state.status = "";
    });
  },
});

export default ClubAuthSlice.reducer;
