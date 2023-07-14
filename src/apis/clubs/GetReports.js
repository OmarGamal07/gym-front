import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const api = "https://gymbackend-r5nw.onrender.com/club/subscriptions";

const initialState = {
  data: [],
  status: "",
  state: "",
  error: "",
  loading: false,
};

const cookies = new Cookies();

export const GetClubReports = createAsyncThunk(
  "ReportsSlice/GetClubReports",
  async () => {
    try {
      const response = await axios.get(api, {headers: {authorization: `Bearer ${cookies.get('_auth_token')}`}});
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

const ReportsSlice = createSlice({
  name: "ReportsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetClubReports.fulfilled, (state, action) => {
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
    builder.addCase(GetClubReports.rejected, (state) => {
      state.data = [];
      state.loading = false;
      state.status = 500;
      state.error = "Server Error";
      state.state = "Rejected";
    });
    builder.addCase(GetClubReports.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = "";
      state.state = "Pending";
      state.status = "";
    });
  },
});

export default ReportsSlice.reducer;
