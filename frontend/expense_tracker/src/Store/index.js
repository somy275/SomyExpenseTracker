import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import incomeReducer from "./incomeSlice"
import expenseReducer from "./expenseSlice"
import totalIncomeExpense from "./TotalIncomeExpense"
import UserLastActive from './LastActive';
import Profile_Update from './profileSlice';
import Setting from './SettingSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        Income: incomeReducer,
        expense: expenseReducer,
        total_income_expense: totalIncomeExpense,
        Active: UserLastActive,
        profile: Profile_Update,
        setting: Setting

    },
});