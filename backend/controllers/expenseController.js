import { Expense } from "../models/Expense.js";
import { TotalIncomeExpense } from "../models/TotalIncomeExpense.js";

export const addUserExpenses = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ message: "User does'nt exist" })

        const { _id } = req.user; //get the user id
        const { Expense_Icon, Amount, Expense_Category, Expense_Date, Expense_Desc } = req.body;  //get the expense data
        const ExpenseDate = Expense_Date ? new Date(Expense_Date) : new Date() //Get Expense Date
        const Month = ExpenseDate.getUTCMonth(); //Get Expense Month
        const Year = ExpenseDate.getUTCFullYear() //Get Expense Year
        // Find or create the TotalIncomeExpense entry for this month/year
        const totalEntry = await TotalIncomeExpense.findOne({ UserId: _id, Month, Year })

        await Expense.create({ UserId: _id, Expense_Icon, Amount, Expense_Category, Expense_Date, Expense_Desc, type: "expense" })
        if (totalEntry) {  //if TotalIncomeExpense already exist for this month then update the total expense and save it.
            totalEntry.Total_Expense += parseInt(Amount);
            totalEntry.save();
        }
        else {   //If the TotalIncomeExpense does not exist then create new TotalIncomeExpense
            await TotalIncomeExpense.create({ UserId: _id, Total_Expense: parseInt(Amount), Total_Income: 0, Month, Year })
        }
        return res.status(200).json({ message: "Expense Added Successfully" })
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

export const getUserExpenses = async (req, res) => {
    if (!req.user) return res.status(400).json({ message: "User does'nt exist" })
    try {
        const ExpenseData = await Expense.find({ UserId: req.user._id }).sort({ createdAt: 1 })
        return res.status(200).json(ExpenseData)
    }
    catch (err) {
        return res.status(400).json({ message: "Server Error" })
    }

}

export const editUserExpenses = async (req, res) => {
    if (!req.user) return res.status(200).json({ message: "User does'nt exist" })
    const { _id } = req.user
    const { id, Expense_Icon, Amount, Expense_Category, Expense_Date, Expense_Desc } = req.body;
    const ExpenseDate = Expense_Date ? new Date(Expense_Date) : new Date() //Get Expense Date
    const Month = ExpenseDate.getUTCMonth(); //Get Expense Month
    const Year = ExpenseDate.getUTCFullYear() //Get Expense Year
    // Find or create the TotalIncomeExpense entry for this month/year
    try {
        const UserExpenseData = await Expense.findOne({ _id: id })
        if (UserExpenseData) {
            await Expense.updateOne({ _id: UserExpenseData._id }, {
                $set: {
                    Expense_Icon, Amount, Expense_Category, Expense_Date, Expense_Desc
                }
            })
        }
        const totalEntry = TotalIncomeExpense.findOne({ UserId: _id, Month, Year })
        if (totalEntry) {
            await TotalIncomeExpense.updateOne({ UserId: _id, Month, Year }, {
                $inc: {
                    Total_Expense: parseInt(Amount) - parseInt(UserExpenseData.Amount)
                }
            })
        }
        return res.status(200).json({ message: "Expense edited successfully" })
    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong. Please try again." })
    }
}

export const deleteUserExpenses = async (req, res) => {
    if (!req.user) return res.status(200).json({ message: "User does'nt exist" })
    const { id: _id } = req.params;

    try {
        const expenseData = await Expense.findById({ _id })
        const { Amount, _id: id, UserId, Expense_Date } = expenseData
        const ExpenseDate = new Date(Expense_Date)
        const Month = ExpenseDate.getUTCMonth()
        const Year = ExpenseDate.getUTCFullYear()
        if (expenseData) {
            await Expense.deleteOne({ _id: id })
        }
        const totalEntry = await TotalIncomeExpense.findOne({ UserId, Month, Year });
        if (totalEntry) {
            totalEntry.Total_Expense -= parseInt(Amount)
            totalEntry.save()
        }
        return res.status(200).json({ message: "Expense Deleted Successfully" })
    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong. Please try again later." })
    }

}