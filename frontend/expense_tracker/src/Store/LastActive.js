import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axoisInstance";
import { API_PATH } from "../utils/apiPath";
export const LastActive = createAsyncThunk("ping/get", async (_, thunkApi) => {
    try {
        const res = await axiosInstance.get(API_PATH.PING.GET)


        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err?.response?.data?.message)
    }
})
const ActiveSlice = createSlice({
    name: "Active",
    initialState: {
        UserActive: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(LastActive.pending, (state) => {
                state.UserActive = null,
                    state.error = null
            })
            .addCase(LastActive.fulfilled, (state, action) => {
                state.UserActive = action.payload,
                    state.error = null

            })
            .addCase(LastActive.rejected, (state) => {
                state.UserActive = null,
                    state.error = null
            })
    }
})

export default ActiveSlice.reducer