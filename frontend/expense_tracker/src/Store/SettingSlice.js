import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axoisInstance";
import { API_PATH } from "../utils/apiPath";
export const CountryData = createAsyncThunk("country/get", async (_, thunkApi) => {
    try {
        const res = await axiosInstance.get(API_PATH.SETTINGS.COUNTRIES)
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message)
    }
})
export const SetCurrency = createAsyncThunk("currency/set", async (data, thunkApi) => {
    try {
        const res = await axiosInstance.post(API_PATH.SETTINGS.SET_CURRENCY, data)
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message)
    }
})
export const GetCurrency = createAsyncThunk("currency/get", async (_, thunkApi) => {
    try {
        const res = await axiosInstance.get(API_PATH.SETTINGS.SET_CURRENCY)
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message)
    }
})

const SelectCurrencySlice = createSlice({
    name: "Select_Currency",
    initialState: {
        Country: [],
        SelectedCurrency: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(CountryData.pending, (state) => {
                state.loading = true,
                    state.Country = [],
                    state.error = null
            })
            .addCase(CountryData.fulfilled, (state, action) => {
                state.loading = false,
                    state.Country = action.payload,
                    state.error = null
            })
            .addCase(CountryData.rejected, (state, action) => {
                state.loading = false,
                    state.Country = [],
                    state.error = action.payload
            })
            .addCase(GetCurrency.pending, (state) => {
                state.SelectedCurrency = null,
                    state.error = null
            })
            .addCase(GetCurrency.fulfilled, (state, action) => {
                state.SelectedCurrency = action.payload,
                    state.error = null
            })
            .addCase(GetCurrency.rejected, (state, action) => {
                state.SelectedCurrency = null,
                    state.error = action.payload
            })
    }
})
export default SelectCurrencySlice.reducer