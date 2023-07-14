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
const api = "https://gymbackend-r5nw.onrender.com/admin/rule?type=payment";
// const api = "http://localhost:8000/admin/rule?type=payment";


export const ChangePaypalHandler = createAsyncThunk(
  "ChangePaypalSlice/ChangePaypalHandler",
  async (arg) => {
    try {
      const response = await axios.post(
        api,
        {
          clientId: arg.clientId,
          clientSecert: arg.clientSecert,
          mode: arg.mode,
          payment_type: "paypal",
        },
        {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+cookies.get("_auth_token")
          }, 
         
        }
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (err) {
      return {
        message: err.response.data,
        status: err.response.status,
      };
    }
  }
);

const ChangePaypalSlice = createSlice({
  name: "ChangePaypalSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ChangePaypalHandler.fulfilled, (state, action) => {
      state.loading = true;
      if (action.payload.status === 201) {
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
    builder.addCase(ChangePaypalHandler.rejected, (state, action) => {
      state.loading = false;
      state.error = "Server Error";
      state.data = {};
      state.state = "Rejected";
      state.status = 500;
    });
    builder.addCase(ChangePaypalHandler.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = {};
      state.state = "Pending";
      state.status = "";
    });
  },
});

export default ChangePaypalSlice.reducer;
