import React, { useEffect, useState } from 'react'
import IncomeOverview from '../../components/IncomeLayout/IncomeOverview'
import AddIncomeForm from '../../components/IncomeLayout/AddIncomeForm';
import RecentIncomeTransaction from '../../components/IncomeLayout/RecentIncomeTransaction';
import { GetIncome } from '../../Store/incomeSlice';
import { useDispatch } from 'react-redux';


const Income = () => {
  const [showAddIncomeForm, setshowAddIncomeForm] = useState(false)
  const dispatch=useDispatch()
useEffect(()=>{
dispatch(GetIncome())
},[dispatch])
  return (
    <section className='w-full h-full  overflow-auto'>
      <IncomeOverview setshowAddIncomeForm={setshowAddIncomeForm} />
      <AddIncomeForm  setshowAddIncomeForm={setshowAddIncomeForm} showAddIncomeForm={showAddIncomeForm}/>
      <RecentIncomeTransaction/>
    </section>
  )
}

export default Income