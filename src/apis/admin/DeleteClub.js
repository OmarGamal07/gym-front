import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const initialState = {
    data: [],
    state: "",
    loading: false,
    status: "",
    error: "",
}

const api = "https://gymbackend-r5nw.onrender.com/admin/club/"
const cookies = new Cookies();

export const DeleteClubHandler = createAsyncThunk("DeleteClubSlice/DeleteClubHandler", async (arg) => {
    try {
        const response = await axios.delete(api + arg.id, { headers: { authorization: `Bearer ${cookies.get('_auth_token')}` } })
        return {
            data: response.data,
            status: response.status,
        }
    }
    catch (err) {
        return {
            message: err.response.data.message,
            status: err.response.status
        }
    }
})


const DeleteClubSlice = createSlice({
    name: "DeleteClubSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(DeleteClubHandler.fulfilled, (state, action) => {
            state.loading = true;
            if (action.payload.status === 200) {
                state.status = action.payload.status;
                state.data = action.payload.data;
                state.error = "";
                state.loading = false;
                state.state = "Deleted Successfuly."
            }
            else {
                state.state = "Error";
                state.status = action.payload.status;
                state.error = action.payload.message;
                state.loading = false;
                state.data = [];
            }
        })
        builder.addCase(DeleteClubHandler.rejected, state => {
            state.loading = false;
            state.data = [];
            state.error = "Server Refused the connection."
            state.state = "Rejected."
            state.status = 500;
        })
        builder.addCase(DeleteClubHandler.pending, state => {
            state.loading = true;
            state.data = [];
            state.error = "";
            state.state = "Pending."
            state.status = "";
        })
    }
})

export default DeleteClubSlice.reducer;