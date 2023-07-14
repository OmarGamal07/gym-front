import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  date: [],
  loading: false,
  status: "",
  state: "",
  error: "",
};

const api = "https://gymbackend-r5nw.onrender.com/user/rules";

export const GetRulesHandler = createAsyncThunk(
  "GetRulesSlice/GetRulesHandler",
  async () => {
    try {
      const response = await axios.get(api);
      console.log(response);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        message: error.response.data.error,
        status: error.response.status,
      };
    }
  }
);

const RulesSlice = createSlice({
  name: "GetRulesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetRulesHandler.fulfilled, (state, action) => {
      state.loading = true;
      if (action.payload.status === 200) {
        state.data = action.payload.data;
        state.loading = false;
        state.error = "";
        state.state = "Success";
        state.status = action.payload.status;
      } else {
        state.data = action.payload.data;
        state.loading = false;
        state.status = action.payload.status;
        state.error = action.payload.message;
        state.state = "Errors";
      }
    });
    builder.addCase(GetRulesHandler.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
      state.status = 500;
      state.state = "Rejected";
      state.data = [];
    });
    builder.addCase(GetRulesHandler.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.status = "";
      state.data = [];
      state.state = "Pending";
    });
  },
});


export default RulesSlice.reducer;