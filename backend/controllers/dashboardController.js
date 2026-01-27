import { TotalIncomeExpense } from "../models/TotalIncomeExpense.js"

export const getDashBoardData = async (req, res) => {
    if (!req.user) return res.status(400).json({ message: "User does'nt exist" })
        
    try {
        const Total_Income_Expense_Data = await TotalIncomeExpense.find({ UserId: req.user._id }).sort({ Year: 1, Month: 1 });
        return res.status(200).json(Total_Income_Expense_Data)
    }
    catch (err) {
        return res.status(400).json({ message: "Server Error" })
    }
}