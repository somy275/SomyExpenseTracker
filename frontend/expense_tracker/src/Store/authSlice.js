import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../utils/axoisInstance"
import { API_PATH } from "../utils/apiPath"
export const login = createAsyncThunk("auth/login", async (data, thunkApi) => {
    try {

        const res = await axiosInstance.post(API_PATH.AUTH.LOGIN, data);
        return res.data.user
    }
    catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Login failed");
    }
})


export const signup = createAsyncThunk("auth/signup", async (data, thunkAPI) => {
    try {

        const res = await axiosInstance.post(API_PATH.AUTH.SIGNUP, data);
        return res.data.user;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Signup failed");
    }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkApi) => {
    try {
        await axiosInstance.get(API_PATH.AUTH.LOGOUT);
        return true;
    } catch (err) {
        return thunkApi.rejectWithValue(err.response?.data?.message || "Logout failed")
    }
})


export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, thunkAPI) => {
    try {

            const res = await axiosInstance.post(API_PATH.AUTH.GET_USER_INFO);
            
            return res.data;


    } catch (err) {
        return thunkAPI.rejectWithValue("Not authenticated",err);
    }
});

export const googleLogin=createAsyncThunk("auth/googleLogin",async(___,thunkApi)=>{
    try{
const res=await axiosInstance.get(API_PATH.AUTH.GOOGLE_LOGIN);
return res.data;
    }
    catch(err){
          return thunkApi.rejectWithValue("Something went wromg. Please try again later",err);
    }
})

export const githubLogin=createAsyncThunk("auth/githubLogin",async(___,thunkApi)=>{
    try{
const res=await axiosInstance.get(API_PATH.AUTH.GITHUB_LOGIN);
return res.data;
    }
    catch(err){
          return thunkApi.rejectWithValue("Something went wromg. Please try again later",err);
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        link:null,
        loading: false,
        error: null,
        initialized: false

    },
    reducers: {
        logout: (state) => {
            state.user = null,
                state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.user=null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.initialized=true
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.user=null,
                state.error = action.payload;
            })

            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;

            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })

            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.initialized = false;

            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.initialized = true;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload;
                state.initialized = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
                state.error = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload
            })
    },
})
export const { logout } = authSlice.actions;
export default authSlice.reducer;