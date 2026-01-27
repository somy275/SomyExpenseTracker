import { Income } from "../models/Income.js";
import { TotalIncomeExpense } from "../models/TotalIncomeExpense.js";
export const addUserIncome = async (req, res) => {  //Add user Income
    try {

        if (!req.user) return res.status(400).json({ message: "User does'nt exist" })
        const { _id } = req.user;  //User id to add income
        const { Income_Icon, Amount, Income_Source, Income_Category, Income_Date, Income_Desc } = req.body
        const IncomeDate = Income_Date ? new Date(Income_Date) : new Date() //Get Income Date
        const Month = IncomeDate.getUTCMonth(); //Get Income Month
        const Year = IncomeDate.getUTCFullYear() //Get Income Year
        // Find or create the TotalIncome entry for this month/year
        const totalEntry = await TotalIncomeExpense.findOne({ UserId: _id, Month, Year })
        //Create new income entry
        await Income.create({ UserId: _id, Income_Icon, Amount, Income_Source, Income_Category, Income_Date: IncomeDate, Income_Desc, type: "income" })

        if (totalEntry) {
            //Update total income
            totalEntry.Total_Income += parseInt(Amount);
            await totalEntry.save()
        }
        else {
            //Create new total income record

            await TotalIncomeExpense.create({ UserId: _id, Total_Income: parseInt(Amount), Total_Expense: 0, Month, Year })
        }
        return res.status(200).json({ message: "Income Added Successfully" })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

export const editUserIncome = async (req, res) => {
    if (!req.user) return res.status(200).json({ message: "User does'nt exist" })
    const { _id } = req.user;  //User id to add income
    const { id, Income_Icon, Amount, Income_Source, Income_Category, Income_Date, Income_Desc } = req.body
    const IncomeDate = Income_Date ? new Date(Income_Date) : new Date()
    const Month = IncomeDate.getUTCMonth();
    const Year = IncomeDate.getUTCFullYear()

    const UserIncomeData = await Income.findOne({ _id: id })
    try {

        if (UserIncomeData) {
            await Income.updateOne({ _id: UserIncomeData._id }, {
                $set: {
                    Income_Icon, Amount, Income_Source, Income_Category, Income_Date: IncomeDate, Income_Desc
                }
            })
        }
        const totalEntry = await TotalIncomeExpense.findOne({ UserId: _id, Month, Year })
        if (totalEntry && !isNaN(Amount) && !isNaN(UserIncomeData.Amount)) {
            await TotalIncomeExpense.updateOne({ UserId: _id, Month, Year }, {
                $inc: {
                    Total_Income: parseInt(Amount) - parseInt(UserIncomeData.Amount)
                }
            })
        }
        return res.status(200).json({ message: "Income edited successfully" })
    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong. Please try again." })
    }

}

export const deleteUserIncome = async (req, res) => {
    try {

        if (!req.user) return res.status(200).json({ message: "User does'nt exist" })
        const { id: _id } = req.params;
        const IncomeData = await Income.findOne({ _id })
        const { Amount, _id: id, UserId, Income_Date } = IncomeData
        const IncomeDate = new Date(Income_Date)
        const Month = IncomeDate.getUTCMonth()
        const Year = IncomeDate.getUTCFullYear()
        if (IncomeData) {
            await Income.deleteOne({ _id: id })
        }
        const totalEntry = await TotalIncomeExpense.findOne({ UserId, Month, Year })
        if (totalEntry) {
            totalEntry.Total_Income -= parseInt(Amount)
            totalEntry.save()
        }
        return res.status(200).json({ message: "Income Deleted Successfully" })
    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong. Please try again later." })
    }



}

export const getUserIncome = async (req, res) => {
    if (!req.user) return res.status(200).json({ message: "User does'nt exist" })
    const RecentIncomes = await Income.find({ UserId: req.user._id }).sort({ createdAt: 1 })

    if (RecentIncomes) {
        return res.status(200).json({ RecentIncomes })
    }
    res.status(500).json({ message: "Income is not added" })
}