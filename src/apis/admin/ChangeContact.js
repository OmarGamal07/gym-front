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
const api = "https://gymbackend-r5nw.onrender.com/admin/rule?type=contact_number";

export const ChangeContactHandler = createAsyncThunk(
  "ChangeContactSlice/ChangeContactHandler",
  async (arg) => {
    try {
      const response = await axios.post(
        api,
        {
          phone1: arg.phone1,
          phone2: arg.phone2,
          location1: arg.location1,
          location2: arg.location2,
        },
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
        message: err.response.data,
        status: err.response.status,
      };
    }
  }
);

const ChangeContactSlice = createSlice({
  name: "ChangeContactSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ChangeContactHandler.fulfilled, (state, action) => {
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
    builder.addCase(ChangeContactHandler.rejected, (state, action) => {
      state.loading = false;
      state.error = "Server Error";
      state.data = {};
      state.state = "Rejected";
      state.status = 500;
    });
    builder.addCase(ChangeContactHandler.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = {};
      state.state = "Pending";
      state.status = "";
    });
  },
});

export default ChangeContactSlice.reducer;
