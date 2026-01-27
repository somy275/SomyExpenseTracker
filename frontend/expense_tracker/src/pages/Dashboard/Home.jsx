import React, { useMemo, useState } from 'react'
import { API_PATH } from '../../utils/apiPath';
import SideBar from '../../components/DashBoardLayout/SideBar';
import StatCards from '../../components/DashBoardLayout/StatCards';
import TopHeader from '../../components/DashBoardLayout/TopHeader';
import IncomeExpenseChart from '../../components/DashBoardLayout/IncomeExpenseChart';
import ExpenseCategory from '../../components/DashBoardLayout/ExpenseCategory';
import FinancialOverview from '../../components/DashBoardLayout/FinancialOverview';
import RecentTransaction from '../../components/DashBoardLayout/RecentTransaction';
import { useDispatch, useSelector } from 'react-redux';
import { GetIncome } from '../../Store/incomeSlice';
import { useEffect } from 'react'
import { GetTotalIncomeExpense } from '../../Store/TotalIncomeExpense';
import { getExpenses } from '../../Store/expenseSlice';
import { Toaster } from 'react-hot-toast';
import { GetCurrency } from '../../Store/SettingSlice';
const Home = () => {
    const dispatch = useDispatch()

    const res = useSelector(state => state.Income.IncomeData.RecentIncomes)
    const res1 = useSelector(state => state.total_income_expense.Total_Income_Expense)
    const res2 = useSelector(state => state.expense.ExpenseData)
    const load1 = useSelector(state => state.total_income_expense.loading)
    const load2 = useSelector(state => state.Income.loading)
    const load3 = useSelector(state => state.expense.loading)
    const [IncomeIncreaseFromPrevious, setIncomeIncreaseFromPrevious] = useState(0)
    const [ExpenseIncreaseFromPrevious, setExpenseIncreaseFromPrevious] = useState(0)
    const [PreviousMonthIncomeExpense, setPreviousMonthIncomeExpense] = useState(0)
    const [CurrentMonthIncomeExpense, setCurrentMonthIncomeExpense] = useState(0)
    const [PreviousMonthSaving, setPreviousMonthSaving] = useState(0)
    const [CurrentMonthSaving, setCurrentMonthSaving] = useState(0)


    useEffect(() => {
        dispatch(GetIncome())
        dispatch(getExpenses())
        dispatch(GetTotalIncomeExpense())
        dispatch(GetCurrency())
    }, [dispatch])

    const TotalMonthIncome = useMemo(() => res?.map((data) => data.Amount).reduce((acc, curr) => acc + curr, 0), [res])
    const TotalMonthExpense = useMemo(() => res2?.map((data) => data.Amount).reduce((acc, curr) => acc + curr, 0), [res2])
    useEffect(() => { //Getting Income Data
        //Find Previous Month Income
        const PreviousMonthIncome = res1?.filter((data) => (data.Month === new Date().getUTCMonth() - 1) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Income)
        //Find Current Month Income
        const CurrMonthIncome = res1?.filter((data) => (data.Month === new Date().getUTCMonth()) && (data.Year === new Date().getUTCFullYear()))?.map((data) => data.Total_Income)
        // //Calculate the Income Increment from previous month
        setIncomeIncreaseFromPrevious(CurrMonthIncome != 0 && PreviousMonthIncome != 0 ? (((CurrMonthIncome[0] - PreviousMonthIncome[0]) / PreviousMonthIncome[0]) * 100).toFixed(2) : "0")
        //Find Previous Month Income
        const PreviousMonthExpense = res1?.filter((data) => (data.Month === new Date().getUTCMonth() - 1) && (data.Year === new Date().getUTCFullYear())).map((data) => data.Total_Expense)
        //Find previous month balance
        setPreviousMonthIncomeExpense(PreviousMonthExpense > PreviousMonthIncome ? 0 : PreviousMonthIncome[0] - PreviousMonthExpense[0])
        //Find Current Month Income
        const CurrMonthExpense = res1?.filter((data) => (data.Month === new Date().getUTCMonth()) && (data.Year === new Date().getUTCFullYear()))?.map((data) => data.Total_Expense)
        //Find Current month balance
        setCurrentMonthIncomeExpense(CurrMonthIncome[0] - CurrMonthExpense[0])
        // //Calculate the Income Increment from previous month
        setExpenseIncreaseFromPrevious((((CurrMonthExpense[0] - PreviousMonthExpense[0]) / PreviousMonthExpense[0]) * 100).toFixed(2) || 0)
        setPreviousMonthSaving(PreviousMonthIncome != 0 && PreviousMonthExpense != 0 ? (((PreviousMonthIncome - PreviousMonthExpense) / PreviousMonthIncome) * 100) : 0)
        setCurrentMonthSaving(CurrMonthIncome != 0 && CurrMonthExpense != 0 ? (((CurrMonthIncome - CurrMonthExpense) / CurrMonthIncome) * 100) : 0)
    }, [res1, PreviousMonthIncomeExpense, CurrentMonthIncomeExpense, PreviousMonthSaving, CurrentMonthSaving])


    if (load1 || load2 || load3) {
        return (
            <div className='h-full flex items-center justify-center py-4 font-medium'>
                <div className='animate-spin   rounded-full h-9 w-9 border-b-2 border-blue-600 mr-2.5'></div>
                <span className="font-medium text-xl">loading</span>
            </div>
        )
    }
    return (
        <section className=' h-full w-full overflow-auto'>
            <StatCards IncomeIncreaseFromPrevious={IncomeIncreaseFromPrevious == "NaN" ? 0 : IncomeIncreaseFromPrevious} ExpenseIncreaseFromPrevious={ExpenseIncreaseFromPrevious == "NaN" ? 0 : ExpenseIncreaseFromPrevious} Income={TotalMonthIncome} Expense={TotalMonthExpense} PreviousMonthIncomeExpense={PreviousMonthIncomeExpense} CurrentMonthIncomeExpense={CurrentMonthIncomeExpense} SavingIncreaseFromPrevious={(CurrentMonthSaving - PreviousMonthSaving).toFixed(2)} />
            <IncomeExpenseChart res={res1} />
            <ExpenseCategory TotalMonthExpense={TotalMonthExpense} />
            <FinancialOverview res={res1} />
            <RecentTransaction />
            <Toaster
                toastOptions={{
                    duration: 2500,
                    error: {
                        style: {
                            backgroundImage: "linear-gradient(to right,#155dfc,#9810fa)",
                            color: "white"
                        },
                    },

                }} />
        </section>
    )

}
export default Home
