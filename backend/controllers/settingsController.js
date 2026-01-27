import axios from "axios"
import { Currency } from "../models/Setting.js";
import { TotalIncomeExpense } from "../models/TotalIncomeExpense.js"
import { Income } from "../models/Income.js";
import { Expense } from "../models/Expense.js";
export const GetCountries = async (_, res) => {
    try {
        const response = await axios.get('https://www.apicountries.com/countries')
        return res.json(response.data)
    }
    catch (err) {
        return res.status(500).json({ message: 'Failed to fetch data' });
    }
}

export const SetCurrencyInfo = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ message: "User does not exist." })
        const { Currency_Info } = req.body
        const base_rate = await getCurrency(Currency_Info, req.user.id)
        await Currency.deleteMany({ UserId: req.user._id })
        await Currency.create({ UserId: req.user._id, Currency: Currency_Info, base_rate })
        await ExchangeCurrency(base_rate, req.user._id)
        return res.status(200).json({ message: "Currency is selected successfully" })
    }
    catch (err) {
        return res.status(400).json({ message: 'Something went wrong.' });
    }
}
export const GetCurrencyInfo = async (req, res) => {

    try {
        const currency = await Currency.findOne({ UserId: req.user._id })
        return res.status(200).json(currency)
    }
    catch (err) {
        return res.status(400).json({ message: 'Something went wrong.' });
    }
}

export const getCurrency = async (currency, UserId) => {
    try {
        currency = currency.slice(0, currency.indexOf(" "))
        let base_Curr = await Currency.findOne({ UserId })
        base_Curr = base_Curr?.Currency.slice(0, base_Curr?.Currency?.indexOf(" "))
        let respone = await axios.get(`https://v6.exchangerate-api.com/v6/9e784379af9a9a9962dd2961/latest/${currency}`)
        if (base_Curr) {
            return respone.data.conversion_rates[base_Curr];
        }
        return respone.data.conversion_rates[currency];
    }
    catch (err) {
        return res.status(400).json({ message: 'Something went wrong.' });
    }
}


export const ExchangeCurrency = async (exchangerate, UserId) => {
    try {

        await ExchnageTotalIncomeExpenseCurrency(exchangerate, UserId)
        await ExchnageIncomeCurrency(exchangerate, UserId)
        await ExchnageExpenseCurrency(exchangerate, UserId)

    }
    catch (err) {
        return res.status(400).json({ message: 'Something went wrong.' });
    }
}

export const ExchnageTotalIncomeExpenseCurrency = async (exchangerate, UserId) => {

    try {
        const user = await TotalIncomeExpense.find({ UserId })
        if (!user || user.length == 0) return res.status(400).json({ message: "User does not exist" })
        const updated = user.map((user) => {
            const updatedIncome = Math.round(user.Total_Income / exchangerate);
            const updatedExpense = Math.round(user.Total_Expense / exchangerate);
            return TotalIncomeExpense.updateOne({
                _id: user._id
            }, {
                $set: {
                    Total_Income: updatedIncome,
                    Total_Expense: updatedExpense
                }
            })
        })
        return await Promise.all(updated)

    }
    catch (err) {
        return res.status(400).json({ message: 'Something went wrong.' });
    }
}

export const ExchnageIncomeCurrency = async (exchangerate, UserId) => {

    try {
        const user = await Income.find({ UserId })
        if (!user || user.length == 0) return res.status(400).json({ message: "User does not exist" })
        const updated = user.map((user) => {
            const updatedAmount = Math.round(user.Amount / exchangerate);
            return Income.updateOne({
                _id: user._id
            }, {
                $set: {
                    Amount: updatedAmount
                }
            })
        })

        return await Promise.all(updated)

    }
    catch (err) {
        return res.status(400).json({ message: 'Something went wrong.' });
    }
}

export const ExchnageExpenseCurrency = async (exchangerate, UserId) => {

    try {
        const user = await Expense.find({ UserId })
        if (!user || user.length == 0) return res.status(400).json({ message: "User does not exist" })
        const updated = user.map((user) => {
            const updatedAmount = Math.round(user.Amount / exchangerate);
            return Expense.updateOne({
                _id: user._id
            }, {
                $set: {
                    Amount: updatedAmount
                }
            })
        })

        return await Promise.all(updated)

    }
    catch (err) {
        return res.status(400).json({ message: 'Something went wrong.' });
    }
}