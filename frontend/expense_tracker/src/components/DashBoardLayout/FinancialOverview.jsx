import { useState } from "react";
import { useMemo } from "react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend, Label } from "recharts"

const FinancialOverview = ({ res }) => {
    const [MonthlyDataPeriod, setMonthlyDataPeriod] = useState(6)
    const monthlyData = [
        { month: 'Jan', income: useMemo(() => res?.filter((data) => (data.Month === 0) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 0) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 0) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), },
        { month: 'Feb', income: useMemo(() => res?.filter((data) => (data.Month === 1) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 1) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 1) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), },
        { month: 'Mar', income: useMemo(() => res?.filter((data) => (data.Month === 2) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 2) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 2) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), },
        { month: 'Apr', income: useMemo(() => res?.filter((data) => (data.Month === 3) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 3) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 3) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), },
        { month: 'May', income: useMemo(() => res?.filter((data) => (data.Month === 4) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 4) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 4) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), },
        { month: 'Jun', income: useMemo(() => res?.filter((data) => (data.Month === 5) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 5) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 5) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), },
        { month: 'July', income: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), },
        { month: 'Aug', income: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), },
        { month: 'July', income: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), },
        { month: 'Sep', income: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), },
        { month: 'Oct', income: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), },
        { month: 'Nov', income: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), },
        { month: 'Dec', income: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)[0] || 0, [res]), expenses: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)[0] || 0, [res]), balance: useMemo(() => res?.filter((data) => (data.Month === 6) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income - data.Total_Expense)[0] || 0, [res]), }
    ];

    const onMonthlyDataPeriod = (e) => {  //In this Event Delegation is used to tackle childrens instead of adding event listener to each individual children
        if (e.target.textContent === "6M") {
            setMonthlyDataPeriod(6)
        }
        else {
            setMonthlyDataPeriod(12)
        }

    }

    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-[93%] mx-auto mt-10'>
            <div className="flex flex-wrap items-center justify-between gap-4 md:gap-0 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Financial Overview</h3>
                <div onClick={onMonthlyDataPeriod} className="relative z-[2] mx-auto md:mx-0 flex space-x-2">
                    <button className={`px-3 py-1 text-sm  ${MonthlyDataPeriod === 6 ? "text-blue-600 bg-blue-50" : "text-gray-600 bg-gray-100"} font-medium rounded-md cursor-pointer`}>6M</button>
                    <button className={`px-3 py-1 text-sm  ${MonthlyDataPeriod === 12 ? "text-blue-600 bg-blue-50" : "text-gray-600 bg-gray-100"} font-medium  rounded-md cursor-pointer`}>1Y</button>
                </div>
            </div>
            <ResponsiveContainer className='mt-[3rem] md:mt-0' width="100%" height={250}>
                <AreaChart  data={monthlyData.filter((_, idx) => idx < MonthlyDataPeriod)}>
                    <CartesianGrid  strokeDasharray="3 3" />
                    <XAxis dataKey="month" ><Label value="Month" offset={-28} position="insideBottom" /></XAxis>
                    <YAxis />
                    <Tooltip />
                    <Legend wrapperStyle={{ top: "-40px",left:"6%" }} />
                    <label />
                    <Area
                        type="monotone"
                        dataKey="income"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.3}
                    />
                    <Area
                        type="monotone"
                        dataKey="expenses"
                        stackId="2"
                        stroke="#E7000B"
                        fill="#E7000B"
                        fillOpacity={0.3}
                    />
                    <Area
                        type="monotone"
                        dataKey="balance"
                        stackId="3"
                        stroke="#6366F1"
                        fill="#6366F1"
                        fillOpacity={0.3}
                    />
                </AreaChart>

            </ResponsiveContainer>
        </div>
    )
}

export default FinancialOverview