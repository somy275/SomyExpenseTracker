import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axoisInstance";
import { API_PATH } from "../utils/apiPath";
export const GetTotalIncomeExpense = createAsyncThunk("total_income_expense/get", async (_, thunkApi) => {
    try {
        const res = await axiosInstance.post(API_PATH.TOTALINCOMEEXPENSE.GET)

        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Income or Expense is not added yet. Please added first")
    }
})

const TotalIncomeExpenseSlice = createSlice({
    name: "total_income_expense",
    initialState: {
        Total_Income_Expense: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetTotalIncomeExpense.pending, (state) => {
                state.loading = true,
                    state.error = null,
                    state.Total_Income_Expense = []
            })
            .addCase(GetTotalIncomeExpense.fulfilled, (state, action) => {
                state.loading = false,
                    state.Total_Income_Expense = action.payload || [],

                    state.error = null
            })
            .addCase(GetTotalIncomeExpense.rejected, (state, action) => {
                state.Total_Income_Expense = [],
                    state.loading = false,
                    state.error = action.payload
            })
    }
})

export default TotalIncomeExpenseSlice.reducer