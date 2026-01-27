import mongoose from "mongoose";
const ExpenseSchema = new mongoose.Schema({  //Create a user expense schema
    UserId: { type: String, required: true },
    Expense_Icon: { type: String },
    Amount: { type: Number, required: true },
    Expense_Category: { type: String, required: true },
    Expense_Date: { type: String, required: true },
    Expense_Desc: { type: String },
    type: { type: String }
}, { timestamps: true })

export const Expense = mongoose.model("Expense_Data", ExpenseSchema)