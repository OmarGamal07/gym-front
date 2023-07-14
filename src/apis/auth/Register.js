import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  state: "",
  error: "",
  status: "",
};

const api = "https://gymbackend-r5nw.onrender.com/auth/register";

export const RegisterHandler = createAsyncThunk(
  "RegisterData/RegisterHandler",
  async (arg) => {
    try {
      const response = await axios.post(api, {
        username: arg.username,
        home_location: arg.home_location,
        phone: arg.phone,
        email: arg.email,
        password: arg.password,
        gender: arg.gender,
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (err) {
      return {
        message: err.response.data.message,
        status: err.response.data.error.statusCode,
      };
    }
  }
);

const RegisterSlice = createSlice({
  name: "RegisterData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RegisterHandler.fulfilled, (state, action) => {
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
    builder.addCase(RegisterHandler.rejected, (state, action) => {
      state.loading = false;
      state.error = "Server Error";
      state.data = {};
      state.state = "Rejected";
      state.status = 500;
    });
    builder.addCase(RegisterHandler.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = {};
      state.state = "Pending";
      state.status = "";
    });
  },
});

export default RegisterSlice.reducer;
