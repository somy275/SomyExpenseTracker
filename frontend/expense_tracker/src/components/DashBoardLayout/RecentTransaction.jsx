import React, { useMemo, useState } from 'react'
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";
import moment from "moment"
import { useSelector } from 'react-redux';
import { PaginationDemo } from '../../UI/PaginationDemo';
const RecentTransaction = () => {
    const [From, setFrom] = useState("")
    const [To, setTo] = useState("")
    const res = useSelector(state => state?.Income?.IncomeData?.RecentIncomes ?? [])
    const res1 = useSelector(state => state?.expense?.ExpenseData ?? [])

    const RecentTransactions = useMemo(() => {  //Recent transaction
        const merged = [...res, ...res1].map((data) => ({// merge income and expense data
            Icon: data?.Income_Icon || data?.Expense_Icon, Desc: data?.Income_Desc || data?.Expense_Desc, RecentTransactionDate: data?.Income_Date || data?.Expense_Date,
            Category: data?.Income_Category || data?.Expense_Category, Amount: data?.Amount,
            Source: data?.Income_Source, type: data.type
        }))
        const sorted = merged.sort((a, b) => b.RecentTransactionDate - a.RecentTransactionDate) //sort merged data
        if (From && To) { //if the user enter the From and To date then return the data according to date
            return sorted.filter(item => new Date(item.RecentTransactionDate) >= new Date(From) && new Date(item.RecentTransactionDate) <= new Date(To)) //filter the merged data according to user
        }
        else { //otherwise return the first 5 recent transaction
            return sorted.slice(-5)
        }
    }, [From, To, res, res1])
    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-[93%] mt-10 mx-auto mb-10'>
            <div className='flex flex-wrap items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold text-gray-900'>
                    Recent Transaction
                </h3>
                <span className='flex flex-wrap items-center justify-center md:justify-normal mt-2 md:mt-0 gap-5'>
                    <span className='flex gap-2 items-center'>
                        <label htmlFor='from' className='text-sm font-semibold text-gray-500'>From:</label>
                        <input onChange={(e) => setFrom(e.target.value)} className='text-[.7rem] border border-gray-500 rounded-md py-1 px-2' id='from' type="date" />
                    </span>
                    <span className='flex gap-2 items-center'>
                        <label htmlFor='to' className='text-sm font-semibold text-gray-500'>To:</label>
                        <input onChange={(e) => setTo(e.target.value)} className='text-[.7rem] border border-gray-500 rounded-md py-1 px-2' id='to' type="date" />
                    </span>
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-900">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {RecentTransactions.map((item) => {
                            return (
                                <tr className="relative py-3 px-4" key={item._id}>
                                    <td className="py-3 px-4">
                                        <div className='flex items-center space-x-3'>
                                            <div className={`p-2 rounded-md ${item.type === 'income' ? "bg-green-50" : "bg-red-50"}`}>
                                                {
                                                    !item.Icon ? item.type === "income" ? <IoMdTrendingUp className="h-4 w-4 text-green-600" /> : <IoMdTrendingDown className="h-4 w-4 text-red-600" /> :
                                                        <img className='h-5 w-5 object-cover shadow-xl' src={item.Icon} />
                                                }
                                            </div>
                                            <span className="font-medium text-gray-900">{item.Desc ?? item.Source}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{item.Category}</td>
                                    <td className="py-3 px-4 text-gray-600">{moment(item.RecentTransactionDate).format("Do MMM, YYYY")}</td>
                                    <td className={`py-3 px-4 text-right font-semibold rounded-md ${item.type === 'income' ? 'text-green-600 ' : 'text-red-600'
                                        }`}>
                                        {item.type === 'income' ? '+' : '-'}${item.Amount.toLocaleString()}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
             
            </div>
        </div>
    )
}

export default RecentTransaction