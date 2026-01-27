import React, { useMemo } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector } from 'react-redux';
import { CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const IncomeOverview = ({ setshowAddIncomeForm }) => {
    const res = useSelector(state => state.total_income_expense.Total_Income_Expense)
    const useMonthlyData = (res) => {
        return useMemo(() => {
            const year = new Date().getUTCFullYear();
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', "Aug", "Sep", "Oct", "Nov", "Dec"].filter((data, idx) => idx <= new Date().getUTCMonth())
            return months.map((monthname, idx) => {
                const data = res.find((entry) => entry.Month === idx && entry.Year === year)
                return {
                    month: monthname,
                    amount: data?.Total_Income || 0
                }
            })
        }, [res])
    }
    const monthlyIncomeData = [
        ...useMonthlyData(res)
    ];
    return (
        <div className='flex flex-col justify-between gap-11 bg-white rounded-xl border border-gray-100 p-6 w-[93%] mt-10 shadow-sm mx-auto'>
            <div className='flex flex-wrap gap-4 min-[900px]:gap-0  justify-between'>
                <span>
                    <h3 className='font-semibold text-[max(1.05rem,4.2vw)] min-[450px]:text-[max(1.2rem,3vw)] md:text-[max(1.32rem,2.5vw)] lg:text-[clamp(0.8125rem,0.6535rem+0.7172vw,1.85rem)]'>Income Overview</h3>
                    <p className='font-medium text-[max(.85rem,3.3vw)] min-[450px]:text-[max(.95rem,2.3vw)] md:text-[max(1.05rem,1.6vw)] lg:text-[clamp(0.7125rem,0.3535rem+0.7172vw,1.85rem)] text-gray-500'>Track your earnings over time and analyze your income trends.</p>
                </span>
                <button onClick={() => setshowAddIncomeForm(true)} className='cursor-pointer min-[450px]:ml-auto h-fit w-fit p-3 flex gap-2 items-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl  shadow-lg text-white'>
                    <IoIosAddCircleOutline />
                    <span className='text-[max(.85rem,3.3vw)] min-[450px]:text-[max(.95rem,2.3vw)] md:text-[max(1.05rem,1.6vw)] lg:text-[clamp(0.7125rem,0.3535rem+0.7172vw,1.85rem)]'>
                        Add Income
                    </span>
                </button>
            </div>
            <div className=''>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyIncomeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" ><Label value="Month" offset={-4} position="insideBottom" /></XAxis>
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3}></Line>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default IncomeOverview