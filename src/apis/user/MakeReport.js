import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    state: '',
    error: '',
    status: '',
}

const api = 'https://gymbackend-r5nw.onrender.com/user/user_reports';

export const MakeReportHandler = createAsyncThunk('ReportSlice/MakeReportHandler', async (arg) => {
    try {
        const response = await axios.post(api, {
            name: arg.name,
            phone: arg.phone,
            email: arg.email,
            password: arg.password,
            message: arg.message
        })
        return {
            data: response.data,
            status: response.status
        }
    }
    catch (err) {
        return {
            message: err.response.data.message,
            status: err.response.data.error.statusCode,
        }
    }
})


const ReportSlice = createSlice({
    name: 'ReportSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(MakeReportHandler.fulfilled, (state, action) => {
            state.loading = true;
            if (action.payload.status === 201) {
                state.data = action.payload.data;
                state.state = 'Success';
                state.status = action.payload.status;
                state.error = null;
                state.loading = false;
            }
            else {
                state.data = {};
                state.state = 'Error';
                state.status = action.payload.status;
                state.error = action.payload.message;
                state.loading = false;
            }
        })
        builder.addCase(MakeReportHandler.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Server Error';
            state.data = {};
            state.state = 'Rejected';
            state.status = 500;
        })
        builder.addCase(MakeReportHandler.pending, state => {
            state.loading = true;
            state.error = '';
            state.data = {};
            state.state = 'Pending';
            state.status = '';
        })
    }
})


export default ReportSlice.reducer;