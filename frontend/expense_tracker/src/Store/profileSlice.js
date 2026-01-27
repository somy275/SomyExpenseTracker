import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../utils/axoisInstance";
import { API_PATH } from "../utils/apiPath";
export const ProfileUpdate = createAsyncThunk("profile/update", async (data, thunkApi) => {
    try {
        const res = await axiosInstance.put(API_PATH.PROFILE.PROFILE_UPDATE, data)
        console.log(res.data);

        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err?.response?.data?.message ?? "Something went wrong. Please try again later.")
    }
})


export const PasswordChange = createAsyncThunk("password/update", async (data, thunkApi) => {
    try {
        const res = await axiosInstance.put(API_PATH.PROFILE.PASSWORD_CHANGE, data)
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err?.response?.data?.message ?? "Something went wrong. Please try again later.")
    }
})

export const ResetPassword = createAsyncThunk("password/reset", async (data, thunkApi) => {
    try {
        const res = await axiosInstance.post(API_PATH.PROFILE.RESET_PASSWORD, data);
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err?.response?.data?.message ?? "Something went wrong. Please try again later.")
    }
})
export const ResetPassTokenVerify = createAsyncThunk("password/token-verify", async (token, thunkApi) => {
    try {
        const res = await axiosInstance.get(`${API_PATH.PROFILE.RESET_TOKEN_VERIFY}/${token}`);
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err?.response?.data?.message ?? "Something went wrong. Please try again later.")
    }
})

export const ResetPassChange = createAsyncThunk("reset-password/change", async (data, thunkApi) => {
    try {
        const res = await axiosInstance.put(API_PATH.PROFILE.RESET_PASSWORD_CHANGE, data);
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err?.response?.data?.message ?? "Something went wrong. Please try again later.")
    }
})

export const SendVerifyEmailLink = createAsyncThunk("email/verify", async (data, thunkApi) => {
    try {
        const res = await axiosInstance.post(API_PATH.PROFILE.VERIFY_EMAIL_LINK, data);
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err?.response?.data?.message ?? "Something went wrong. Please try again later.")
    }
})

export const VerifyEmailToken = createAsyncThunk("email-token/verify", async (token, thunkApi) => {
    try {
        const res = await axiosInstance.get(`${API_PATH.PROFILE.VERIFY_EMAIL_LINK}/${token}`);
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err?.response?.data?.message ?? "Something went wrong. Please try again later.")
    }
})

export const VerifyEmailRandomToken = createAsyncThunk("email-randomtoken/verify", async (token, thunkApi) => {
    try {
        const res = await axiosInstance.post(API_PATH.PROFILE.VERIFY_EMAIL_TOKEN, token);
        return res.data;
    }
    catch (err) {
        return thunkApi.rejectWithValue(err?.response?.data?.message ?? "Something went wrong. Please try again later.")
    }
})


const profileSlice = createSlice({
    name: "profile",
    initialState: {
        loading: false,
        Submitted: null,
        error: null,
        ResetUserId: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(ProfileUpdate.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(ProfileUpdate.fulfilled, (state) => {
                state.loading = false,
                    state.error = null
            })
            .addCase(ProfileUpdate.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(PasswordChange.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(PasswordChange.fulfilled, (state) => {
                state.loading = false,
                    state.error = null
            })
            .addCase(PasswordChange.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(ResetPassword.pending, (state) => {
                state.loading = true,
                    state.Submitted = false,
                    state.error = null
            })
            .addCase(ResetPassword.fulfilled, (state, action) => {
                state.loading = false,
                    state.Submitted = action.payload,
                    state.error = null
            })
            .addCase(ResetPassword.rejected, (state, action) => {
                state.loading = false,
                    state.Submitted = action.payload,
                    state.error = action.payload
            })
            .addCase(ResetPassTokenVerify.pending, (state) => {
                state.loading = true,
                    state.ResetUserId = null,
                    state.error = null
            })
            .addCase(ResetPassTokenVerify.fulfilled, (state, action) => {
                state.loading = false,
                    state.ResetUserId = action.payload,
                    state.error = null
            })
            .addCase(ResetPassTokenVerify.rejected, (state, action) => {
                state.loading = false,
                    state.ResetUserId = null,
                    state.error = action.payload
            })
            .addCase(ResetPassChange.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(ResetPassChange.fulfilled, (state) => {
                state.loading = false,
                    state.error = null
            })
            .addCase(ResetPassChange.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(VerifyEmailToken.pending, (state) => {
                state.loading = true,
                    state.Submitted = false,
                    state.error = null
            })
            .addCase(VerifyEmailToken.fulfilled, (state) => {
                state.loading = false,
                    state.Submitted = true,
                    state.error = null
            })
            .addCase(VerifyEmailToken.rejected, (state, action) => {
                state.loading = false,
                    state.Submitted = false,
                    state.error = action.payload
            })
            .addCase(VerifyEmailRandomToken.pending, (state) => {
                state.loading = true,
                    state.Submitted = false,
                    state.error = null
            })
            .addCase(VerifyEmailRandomToken.fulfilled, (state) => {
                state.loading = false,
                    state.Submitted = true,
                    state.error = null
            })
            .addCase(VerifyEmailRandomToken.rejected, (state, action) => {
                state.loading = false,
                    state.Submitted = false,
                    state.error = action.payload
            })

    }
});

export default profileSlice.reducer