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
const api = "https://gymbackend-r5nw.onrender.com/user/confirm_payment/";
// const api = "http://localhost:8000/user/confirm_payment/";

export const ConfirmPaymentHandler = createAsyncThunk(
  "ConfirmPaymentSlice/ConfirmPaymentHandler",
  async (arg) => {
    try {
      const response = await axios.post(
        api + arg.subId,
        { paymentId: arg.paymentId, payerId: arg.payerId },
        { headers: { authorization: `Bearer ${cookies.get("_auth_token")}` } }
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (err) {
      return {
        message: err.response.data.err,
        status: err.response.status,
      };
    }
  }
);

const ConfirmPaymelSlice = createSlice({
  name: "ConfirmPaymelSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ConfirmPaymentHandler.fulfilled, (state, action) => {
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
    builder.addCase(ConfirmPaymentHandler.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = "Server Error";
      state.data = {};
      state.state = "Rejected";
      state.status = 500;
    });
    builder.addCase(ConfirmPaymentHandler.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = {};
      state.state = "Pending";
      state.status = "";
    });
  },
});

export default ConfirmPaymelSlice.reducer;
