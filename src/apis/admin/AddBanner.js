import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const initialState = {
  data: [],
  loading: false,
  state: "",
  error: "",
  status: "",
};
const cookies = new Cookies();
// const api = "https://gyms-s47e.onrender.com/admin/rule?type=banner";
// const api = "http://localhost:8000/admin/rule?type=banner";
const api = "https://gymbackend-r5nw.onrender.com/admin/rule?type=banner";

export const BannerHandler = createAsyncThunk(
  "BannerHandler/BannerSlice",
  async (arg) => {
    try {
      const response = await axios.post(
        api,
        arg,
        {
          headers: { authorization: `Bearer ${cookies.get("_auth_token")}` },
        }
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (err) {
      return {
        message: err.response.data.err.msg,
        status: err.response.status,
      };
    }
  }
);

const BannerSlice = createSlice({
  name: "BannerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(BannerHandler.fulfilled, (state, action) => {
      state.loading = true;
      if (action.payload.status === 200) {
        state.data = action.payload.data;
        state.state = "Success";
        state.status = action.payload.status;
        state.error = null;
        state.loading = false;
      } else {
        state.data = {};
        state.state = "Error";
        state.status = action.payload.status;
        state.error = action.payload.message;
        state.loading = false;
      }
    });
    builder.addCase(BannerHandler.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = "Server Error";
      state.data = {};
      state.state = "Rejected";
      state.status = 500;
    });
    builder.addCase(BannerHandler.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = {};
      state.state = "Pending";
      state.status = "";
    });
  },
});

export default BannerSlice.reducer;
