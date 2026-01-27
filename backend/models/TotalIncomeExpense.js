import mongoose from "mongoose"

const TotalIncomeExpenseSchema = new mongoose.Schema({
    UserId: {
        type: String, required: true
    },
    Month: { type: Number, required: true },  // 0 = Jan, 11 = Dec
    Year: { type: Number, required: true },
    Total_Income: { type: Number, required: true },
    Total_Expense: { type: Number, required: true }
}, { timestamps: true })

export const TotalIncomeExpense = mongoose.model("Total_Income_Expense_Data", TotalIncomeExpenseSchema)