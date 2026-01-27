
import React, { useState, useEffect } from 'react'
import ExpenseOverview from '../../components/ExpenseLayout/ExpenseOverview';
import AddExpenseForm from '../../components/ExpenseLayout/AddExpenseForm';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses } from '../../Store/expenseSlice';
import RecentExpenseTransaction from '../../components/ExpenseLayout/RecentExpenseTransaction';

const Expense = () => {
  const [showAddIncomeForm, setshowAddIncomeForm] = useState(false)
  const res = useSelector(state => state.total_income_expense.Total_Income_Expense)


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getExpenses())

    return () => { } //cleanup
  }, [dispatch])

  return (
    <section className='w-full h-full  overflow-auto'>
      <ExpenseOverview res={res} setshowAddIncomeForm={setshowAddIncomeForm} />
      <AddExpenseForm setshowAddIncomeForm={setshowAddIncomeForm} showAddIncomeForm={showAddIncomeForm} />
      <RecentExpenseTransaction />
    </section>
  )
}



export default Expense