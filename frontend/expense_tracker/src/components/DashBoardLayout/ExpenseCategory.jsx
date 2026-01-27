import React from 'react'
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, Tooltip, Legend, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const ExpenseCategory = ({ TotalMonthExpense }) => {
    const res = useSelector(state => state.expense.ExpenseData)

    const expenseCategories = [
        { name: 'Food & Dining', value: useMemo(() => Math.round((res?.filter((data) => data.Expense_Category === "Food & Dining")?.map((data) => data.Amount)?.reduce((acc, curr) => acc + curr, 0) / TotalMonthExpense) * 100), [TotalMonthExpense, res]), color: '#8b5cf6', },
        { name: 'Transportation', value: useMemo(() => Math.round((res?.filter((data) => data.Expense_Category === "Transportation")?.map((data) => data.Amount)?.reduce((acc, curr) => acc + curr, 0) / TotalMonthExpense) * 100), [TotalMonthExpense, res]), color: '#06b6d4', },
        { name: 'Shopping', value: useMemo(() => Math.round((res?.filter((data) => data.Expense_Category === "Shopping")?.map((data) => data.Amount)?.reduce((acc, curr) => acc + curr, 0) / TotalMonthExpense) * 100), [TotalMonthExpense, res]), color: '#f59e0b' },
        { name: 'Bills & Utilities', value: useMemo(() => Math.round((res?.filter((data) => data.Expense_Category === "Bills & Utilities")?.map((data) => data.Amount)?.reduce((acc, curr) => acc + curr, 0) / TotalMonthExpense) * 100), [TotalMonthExpense, res]), color: '#ef4444' },
        { name: 'Entertainment', value: useMemo(() => Math.round((res?.filter((data) => data.Expense_Category === "Entertainment")?.map((data) => data.Amount)?.reduce((acc, curr) => acc + curr, 0) / TotalMonthExpense) * 100), [TotalMonthExpense, res]), color: '#10b981' },
        { name: 'Education', value: useMemo(() => Math.round((res?.filter((data) => data.Expense_Category === "Education")?.map((data) => data.Amount)?.reduce((acc, curr) => acc + curr, 0) / TotalMonthExpense) * 100), [TotalMonthExpense, res]), color: '#6366f1' },
        { name: 'HealthCare', value: useMemo(() => Math.round((res?.filter((data) => data.Expense_Category === "Healthcare")?.map((data) => data.Amount)?.reduce((acc, curr) => acc + curr, 0) / TotalMonthExpense) * 100), [TotalMonthExpense, res]), color: 'orange' },
        { name: 'Travel', value: useMemo(() => Math.round((res?.filter((data) => data.Expense_Category === "Travel")?.map((data) => data.Amount)?.reduce((acc, curr) => acc + curr, 0) / TotalMonthExpense) * 100), [TotalMonthExpense, res]), color: 'blue' },
        { name: 'Other', value: useMemo(() => Math.round((res?.filter((data) => data.Expense_Category === "Other")?.map((data) => data.Amount)?.reduce((acc, curr) => acc + curr, 0) / TotalMonthExpense) * 100), [TotalMonthExpense, res]), color: 'grey' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6 w-[93%] mx-auto mt-10 ">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                    <Pie data={expenseCategories.filter((data) => data.value != 0)} cx="50%" cy="50%" outerRadius={80}
                        fill="#8884d8"
                        dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                        {expenseCategories.map((entry, index) => (
                            <Cell key={`cell-${index + 1}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ Top: '30px' }} verticalAlign='bottom' />
                </RechartsPieChart>

            </ResponsiveContainer>
        </div >
    )
}

export default ExpenseCategory