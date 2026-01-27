

import React, { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label } from "recharts"
const IncomeExpenseChart = ({ res }) => {
    const useMonthlyData = (res) => { //this function gives monthly income data from january to current month
        const year = new Date().getUTCFullYear();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', "Aug", "Sep", "Oct", "Nov", "Dec"].filter((data, idx) => idx <= new Date().getUTCMonth())
        return useMemo(() => { //this returns memoized data if the dependency is not changed
            return months.map((monthname, idx) => {
                const data = res.find((entry) => entry.Month === idx && entry.Year === year)

                return {

                    month: monthname,
                    income: data?.Total_Income || 0,
                    expenses: data?.Total_Expense || 0
                };
            });
        }, [months, year, res]);
    }

    const monthlyData = [
        ...useMonthlyData(res)
    ]

    return (
        <div className="mx-auto mt-10 bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-[93%]">
            <h3 className="text-[max(1.05rem,4.2vw)] min-[450px]:text-[max(1.2rem,3vw)] md:text-[max(1.32rem,2.5vw)] lg:text-[clamp(0.8125rem,0.6535rem+0.7172vw,1.85rem)] font-semibold text-gray-900 mb-4">Income vs Expenses</h3>
            <ResponsiveContainer className='mt-[3rem] sm:mt-0' width="100%" height={300}>
                <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month"   > <Label value="Month" offset={-28} position="insideBottom" /></XAxis>
                    <YAxis />
                    <Tooltip />
                    <Legend wrapperStyle={{ top: -40 }} align='right' />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default IncomeExpenseChart