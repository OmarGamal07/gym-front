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
const api = "https://gymbackend-r5nw.onrender.com/club/subscription";
// const api = "http://localhost:8000/club/subscription";

export const AddSubHandler = createAsyncThunk(
  "SubSlice/AddSubHandler",
  async (arg) => {
    try {
      const response = await axios.post(
        api,
        { name: arg.name, price: arg.price, type: arg.type,numberType:arg.numberType },
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

const SubSlice = createSlice({
  name: "SubSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddSubHandler.fulfilled, (state, action) => {
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
    builder.addCase(AddSubHandler.rejected, (state, action) => {
      state.loading = false;
      state.error = "Server Error";
      state.data = {};
      state.state = "Rejected";
      state.status = 500;
    });
    builder.addCase(AddSubHandler.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.data = {};
      state.state = "Pending";
      state.status = "";
    });
  },
});

export default SubSlice.reducer;
