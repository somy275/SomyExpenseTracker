import mongoose from "mongoose";
const IncomeSchema = new mongoose.Schema({
    UserId: { type: String, required: true },    //Create an Income Schema
    Income_Icon: { type: String },
    Amount: { type: Number, required: true },
    Income_Source: { type: String, required: true },
    Income_Category: { type: String, required: true },
    Income_Date: { type: String, required: true },
    Income_Desc: { type: String },
    type: { type: String }
}, { timestamps: true })

export const Income = mongoose.model("Income_Data", IncomeSchema)
