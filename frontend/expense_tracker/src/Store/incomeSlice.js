import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axoisInstance";
import { API_PATH } from "../utils/apiPath";

export const AddIncome = createAsyncThunk("income/add", async (data, thunkApi) => {
    try {
        const res = await axiosInstance.post(API_PATH.INCOME.ADD, data);
        return res.data

    }
    catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Income is not added. Try again later")
    }
})


export const GetIncome = createAsyncThunk("income/get", async (_, thunkApi) => {
    try {
        const res = await axiosInstance.post(API_PATH.INCOME.GETINCOME);

        return res.data

    }
    catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Income is not added yet. Please add income first.")
    }
})

export const EditIncome = createAsyncThunk("income/edit", async (data, thunkApi) => {
    try {
        const res = await axiosInstance.put(API_PATH.INCOME.EDITINCOME, data)
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err.reponse?.data?.message || "Server error. Try again later.")
    }
})

export const DeleteIncomeData = createAsyncThunk("income/delete", async (id, thunkApi) => {
    try {
        const res = await axiosInstance.delete(`${API_PATH.INCOME.DELETEINCOME}/${id}`)
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "server error, Try again later")
    }
})


const incomeSlice = createSlice({
    name: "Income",
    initialState: {
        IncomeData: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddIncome.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(AddIncome.fulfilled, (state) => {
                state.loading = false,
                    state.error = null
            })
            .addCase(AddIncome.rejected, (state, action) => {
                state.error = action.payload,
                    state.loading = false
            })
            .addCase(GetIncome.pending, (state) => {
                state.loading = true;
                state.IncomeData = []
            })
            .addCase(GetIncome.fulfilled, (state, action) => {
                state.loading = false;
                state.IncomeData = action.payload || [];


            })
            .addCase(GetIncome.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(EditIncome.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(EditIncome.fulfilled, (state) => {
                state.loading = false;
                state.error = null
            })
            .addCase(EditIncome.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(DeleteIncomeData.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(DeleteIncomeData.fulfilled, (state) => {
                state.loading = false;
                state.error = null
            })
            .addCase(DeleteIncomeData.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
}
)

export default incomeSlice.reducer
