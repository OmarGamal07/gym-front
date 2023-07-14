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

const api = "https://gymbackend-r5nw.onrender.com/user/make_sub/";
// const api = "http://localhost:8000/user/make_sub/";

export const MakeSubsHandler = createAsyncThunk(
  "SubSlice/MakeSubsHandler",
  async (arg) => {
    try {
      const response = await axios.post(
        api + arg.id + `?type=paypal`,
        {},
        { headers: { authorization: `Bearer ${cookies.get("_auth_token")}` } }
      );
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

const SubSlice = createSlice({
  name: "SubSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(MakeSubsHandler.fulfilled, (state, action) => {
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
    builder.addCase(MakeSubsHandler.rejected, (state, action) => {
      state.loading = false;
      state.error = "Server Error";
      state.data = {};
      state.state = "Rejected";
      state.status = 500;
    });
    builder.addCase(MakeSubsHandler.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = {};
      state.state = "Pending";
      state.status = "";
    });
  },
});

export default SubSlice.reducer;
