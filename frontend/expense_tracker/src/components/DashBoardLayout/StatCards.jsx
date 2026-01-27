
import { CgDollar } from "react-icons/cg";
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";
import { FiPieChart } from "react-icons/fi";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const StatCards = ({ Income, Expense, IncomeIncreaseFromPrevious, ExpenseIncreaseFromPrevious, PreviousMonthIncomeExpense, CurrentMonthIncomeExpense, SavingIncreaseFromPrevious }) => {
    const { SelectedCurrency } = useSelector(state => state?.setting)
    const Total_Balance = useMemo(() => Income - Expense, [Income, Expense])
    const TotalBalanceIncreaseFromPrevious = useMemo(() => PreviousMonthIncomeExpense ? (PreviousMonthIncomeExpense > 0 ? (((CurrentMonthIncomeExpense - PreviousMonthIncomeExpense) / PreviousMonthIncomeExpense) * 100).toFixed(2) : 100) : 0, [PreviousMonthIncomeExpense, CurrentMonthIncomeExpense])
    const Saving = useMemo(() => (((Income - Expense) / Income) * 100), [Income, Expense])



    return (
        <div className="space-y-6 w-full p-5 md:p-9 ">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-[max(.85rem,3.3vw)] min-[450px]:text-[max(.95rem,2.3vw)] md:text-[max(1.05rem,1.6vw)] lg:text-[clamp(0.7125rem,0.4535rem+0.7172vw,1.85rem)] font-medium">Total Balance</p>
                            <p className="text-[max(1.5rem,5.7vw)] min-[450px]:text-[max(1.6rem,4vw)] md:text-[max(1.9rem,3.3vw)] lg:text-[clamp(1.4375rem,0.9785rem+0.7172vw,1.875rem)] font-bold text-gray-900 flex items-center gap-1"> <span>{SelectedCurrency?.Currency?.slice(SelectedCurrency?.Currency?.indexOf("(") + 1, -1)}</span>{Total_Balance}</p>
                        </div>
                        <div className="bg-blue-100 p-2 min-[450px]:p-2.5 sm:p-3 rounded-lg">
                            <CgDollar className="text-[max(1.5rem,5.7vw)] min-[450px]:text-[max(1.6rem,4vw)] md:text-[max(1.9rem,3.3vw)] lg:text-[clamp(1.4375rem,0.9785rem+0.7172vw,1.875rem)] text-blue-600" />
                        </div>
                    </div>
                    <p className="text-green-600 text-[max(.85rem,3.3vw)] min-[450px]:text-[max(.95rem,2.3vw)] md:text-[max(1.05rem,1.6vw)] lg:text-[clamp(0.7125rem,0.3535rem+0.7172vw,1.85rem)] mt-2">{!isNaN(TotalBalanceIncreaseFromPrevious) ? TotalBalanceIncreaseFromPrevious >= 0 ? "+" + TotalBalanceIncreaseFromPrevious : TotalBalanceIncreaseFromPrevious : "+0"}% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-[max(.85rem,3.3vw)] min-[450px]:text-[max(.95rem,2.3vw)] md:text-[max(1.05rem,1.6vw)] lg:text-[clamp(0.7125rem,0.4535rem+0.7172vw,1.85rem)] font-medium">Total Income</p>
                            <p className="text-[max(1.5rem,5.7vw)] min-[450px]:text-[max(1.6rem,4vw)] md:text-[max(1.9rem,3.3vw)] lg:text-[clamp(1.4375rem,0.9785rem+0.7172vw,1.875rem)] font-bold text-green-600 flex items-center gap-1"> <span>{SelectedCurrency?.Currency?.slice(SelectedCurrency?.Currency?.indexOf("(") + 1, -1)}</span>{Income}</p>
                        </div>
                        <div className="bg-green-100 p-2 min-[450px]:p-2.5 sm:p-3 rounded-lg">
                            <IoMdTrendingUp className="text-[max(1.5rem,5.7vw)] min-[450px]:text-[max(1.6rem,4vw)] md:text-[max(1.9rem,3.3vw)] lg:text-[clamp(1.4375rem,0.9785rem+0.7172vw,1.875rem)] text-green-600" />
                        </div>
                    </div>
                    <p className="text-green-600 text-[max(.85rem,3.3vw)] min-[450px]:text-[max(.95rem,2.3vw)] md:text-[max(1.05rem,1.6vw)] lg:text-[clamp(0.7125rem,0.3535rem+0.7172vw,1.85rem)] mt-2">{IncomeIncreaseFromPrevious >= 0 ? "+" + IncomeIncreaseFromPrevious : IncomeIncreaseFromPrevious}% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-[max(.85rem,3.3vw)] min-[450px]:text-[max(.95rem,2.3vw)] md:text-[max(1.05rem,1.6vw)] lg:text-[clamp(0.7125rem,0.4535rem+0.7172vw,1.85rem)] font-medium">Total Expenses</p>
                            <p className="text-[max(1.5rem,5.7vw)] min-[450px]:text-[max(1.6rem,4vw)] md:text-[max(1.9rem,3.3vw)] lg:text-[clamp(1.4375rem,0.9785rem+0.7172vw,1.875rem)] font-bold text-red-600 flex items-center gap-1">
                                <span>{SelectedCurrency?.Currency?.slice(SelectedCurrency?.Currency?.indexOf("(") + 1, -1)}</span>{Expense}</p>
                        </div>
                        <div className="bg-red-100 p-2 min-[450px]:p-2.5 sm:p-3 rounded-lg">
                            <IoMdTrendingDown className="text-[max(1.5rem,5.7vw)] min-[450px]:text-[max(1.6rem,4vw)] md:text-[max(1.9rem,3.3vw)] lg:text-[clamp(1.4375rem,0.9785rem+0.7172vw,1.875rem)] text-red-600" />
                        </div>
                    </div>
                    <p className="text-red-600 text-[max(.85rem,3.3vw)] min-[450px]:text-[max(.95rem,2.3vw)] md:text-[max(1.05rem,1.6vw)] lg:text-[clamp(0.7125rem,0.3535rem+0.7172vw,1.85rem)] mt-2">{!isNaN(ExpenseIncreaseFromPrevious) ? ExpenseIncreaseFromPrevious >= 0 ? "+" + ExpenseIncreaseFromPrevious : ExpenseIncreaseFromPrevious : "+0"}% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-[max(.85rem,3.3vw)] min-[450px]:text-[max(.95rem,2.3vw)] md:text-[max(1.05rem,1.6vw)] lg:text-[clamp(0.7125rem,0.4535rem+0.7172vw,1.85rem)] font-medium">Savings Rate</p>
                            <p className="text-[max(1.5rem,5.7vw)] min-[450px]:text-[max(1.6rem,4vw)] md:text-[max(1.9rem,3.3vw)] lg:text-[clamp(1.4375rem,0.9785rem+0.7172vw,1.875rem)] font-bold text-purple-600">{Saving > 0 ? Saving.toFixed(2) : "0"}%</p>
                        </div>
                        <div className="bg-purple-100 p-2 min-[450px]:p-2.5 sm:p-3 rounded-lg">
                            <FiPieChart className="text-[max(1.5rem,5.7vw)] min-[450px]:text-[max(1.6rem,4vw)] md:text-[max(1.9rem,3.3vw)] lg:text-[clamp(1.4375rem,0.9785rem+0.7172vw,1.875rem)] text-purple-600" />
                        </div>
                    </div>
                    <p className="text-green-600 text-[max(.85rem,3.3vw)] min-[450px]:text-[max(.95rem,2.3vw)] md:text-[max(1.05rem,1.6vw)] lg:text-[clamp(0.7125rem,0.3535rem+0.7172vw,1.85rem)] mt-2">{!isNaN(SavingIncreaseFromPrevious) ? SavingIncreaseFromPrevious >= 0 ? "+" + SavingIncreaseFromPrevious : SavingIncreaseFromPrevious : "+0"}% from last month</p>
                </div>
            </div>

        </div>
    )
}

export default StatCards