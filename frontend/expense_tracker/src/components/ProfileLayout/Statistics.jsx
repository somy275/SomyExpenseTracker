import React, { useMemo } from 'react'
import { BsArrowUpCircleFill } from "react-icons/bs";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { useSelector } from 'react-redux';
const Statistics = () => {
  const TotalIncomeTrans = useSelector(state => state.Income.IncomeData.RecentIncomes)
  const TotalExpenseTrans = useSelector(state => state.expense.ExpenseData)
  const PrevTotalIncomeTrans = useMemo(() => TotalIncomeTrans.filter((data) => new Date(data.Income_Date).getUTCMonth() === new Date().getUTCMonth() - 1), [TotalIncomeTrans])
  const CurrTotalIncomeTrans = useMemo(() => TotalIncomeTrans.filter((data) => new Date(data.Income_Date).getUTCMonth() === new Date().getUTCMonth()), [TotalIncomeTrans])
  const PrevTotalExpenseTrans = useMemo(() => TotalExpenseTrans.filter((data) => new Date(data.Expense_Date).getUTCMonth() === new Date().getUTCMonth() - 1), [TotalExpenseTrans])
  const CurrTotalExpenseTrans = useMemo(() => TotalExpenseTrans.filter((data) => new Date(data.Expense_Date).getUTCMonth() === new Date().getUTCMonth()), [TotalExpenseTrans])
  const CurrTotalTrans = CurrTotalIncomeTrans.length + CurrTotalExpenseTrans.length
  const PrevTotalTrans = PrevTotalIncomeTrans.length + PrevTotalExpenseTrans.length

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Transaction Summary</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#DBEAFE] rounded-lg">
            <div className="flex items-center space-x-3">
              <PiCurrencyCircleDollarFill className="w-10 h-10 text-[#155DFC]" />
              <div>
                <p className="font-medium text-[#0738a3]">Total Transactions</p>
                <p className="text-sm text-[#155DFC]">This month</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#0738a3]">{TotalIncomeTrans.length + TotalExpenseTrans.length}</p>
              <p className="text-sm text-[#155DFC]">{(CurrTotalTrans - PrevTotalTrans) >= 0 ? `+${CurrTotalTrans - PrevTotalTrans}` : CurrTotalTrans - PrevTotalTrans} from last month</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <BsArrowUpCircleFill className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Income Transactions</p>
                <p className="text-sm text-green-600">This month</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-800">{TotalIncomeTrans.length}</p>
              <p className="text-sm text-green-600">{(CurrTotalIncomeTrans.length - PrevTotalIncomeTrans.length) >= 0 ? `+${CurrTotalIncomeTrans.length - PrevTotalIncomeTrans.length}` : CurrTotalIncomeTrans.length - PrevTotalIncomeTrans.length} from last month</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <BsArrowDownCircleFill className="w-8 h-8 text-red-600" />
              <div>
                <p className="font-medium text-red-800">Expense Transactions</p>
                <p className="text-sm text-red-600">This month</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-800">{TotalExpenseTrans.length}</p>
              <p className="text-sm text-red-600">{(CurrTotalExpenseTrans.length - PrevTotalExpenseTrans.length) >= 0 ? `+${CurrTotalExpenseTrans.length - PrevTotalExpenseTrans.length}` : CurrTotalExpenseTrans.length - PrevTotalExpenseTrans.length} from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics