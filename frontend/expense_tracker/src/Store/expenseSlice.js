import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axoisInstance";
import { API_PATH } from "../utils/apiPath";
export const AddExpense = createAsyncThunk("expense/add", async (data, thunkApi) => {
    try {
        const res = await axiosInstance.post(API_PATH.EXPENSE.ADD, data)

        return res.data;

    }
    catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Expense not added. Please try again later.")
    }
})


export const getExpenses = createAsyncThunk("expense/get", async (_, thunkApi) => {
    try {
        const res = await axiosInstance.post(API_PATH.EXPENSE.GETEXPENSE)
        return res.data
    }
    catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Expenses is not added yet. Please add expense first.")
    }
})

export const EditExpense = createAsyncThunk("expense/edit", async (data, thunkApi) => {
    try {
        const res = await axiosInstance.put(API_PATH.EXPENSE.EDITEXPENSE, data)
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err.reponse?.data?.message || "Server error. Try again later.")
    }
})

export const DeleteExpenseData = createAsyncThunk("expense/delete", async (id, thunkApi) => {
    try {
        const res = await axiosInstance.delete(`${API_PATH.EXPENSE.DELETEEXPENSE}/${id}`)
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "server error, Try again later")
    }
})


const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        ExpenseData: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddExpense.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(AddExpense.fulfilled, (state) => {
                state.loading = false,
                    state.error = null
            })
            .addCase(AddExpense.rejected, (state, action) => {
                state.error = action.payload,
                    state.loading = false
            })
            .addCase(getExpenses.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getExpenses.fulfilled, (state, action) => {
                state.loading = false,
                    state.ExpenseData = action.payload
                state.error = null
            })
            .addCase(getExpenses.rejected, (state, action) => {
                state.error = action.payload,
                    state.loading = false
            })
            .addCase(EditExpense.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(EditExpense.fulfilled, (state) => {
                state.loading = false,
                    state.error = null
            })
            .addCase(EditExpense.rejected, (state, action) => {
                state.error = action.payload,
                    state.loading = false
            })
    }
})

export default expenseSlice.reducer