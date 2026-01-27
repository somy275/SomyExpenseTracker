
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { IoMdTrendingUp } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import moment from 'moment';
import EditExpenseForm from './EditExpenseForm';
import DeleteExpense from './DeleteExpens';
const RecentExpenseTransaction = () => {
    const res = useSelector(state => state.expense.ExpenseData)
    const [showEditExpenseForm, setshowEditExpenseForm] = useState(false)
    const [ShowDeleteExpensePage, setShowDeleteExpensePage] = useState(false)
    const [EditExpenseData, setEditExpenseData] = useState([])
    const [DeleteExpenseId, setDeleteExpenseId] = useState("")
    const [From, setFrom] = useState("")
    const [To, setTo] = useState("")

    const onEditExpense = (id) => {
        setshowEditExpenseForm(true)
        setEditExpenseData(res.filter((data) => data._id == id))
    }

    const onDeleteExpense = (id) => {
        setDeleteExpenseId(id)
        setShowDeleteExpensePage(true)
    }

    const RecentExpenseTransaction = useMemo(() => {
        const sorted = [...res]?.sort((a, b) => b.Expense_Date - a.Expense_Date);
        if (From && To) {
            return sorted.filter(item => new Date(item.Expense_Date) >= new Date(From) && new Date(item.Expense_Date) <= new Date(To))
        }
        else {
            return sorted.slice(-5)
        }
    }, [res, From, To])



    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-[93%] my-14 mx-auto">
            <div className='flex flex-wrap items-center  justify-around lg:justify-between mb-4'>
                <h3 className="text-center lg:text-left text-[max(1.05rem,4.2vw)] min-[450px]:text-[max(1.2rem,3vw)] md:text-[max(1.32rem,2.5vw)] lg:text-[clamp(0.8125rem,0.6535rem+0.7172vw,1.85rem)] font-semibold mb-7">Recent Expense Transactions</h3>
                <span className='flex flex-wrap justify-around min-[900px]:justify-start items-center gap-5 mb-5'>
                    <span className='flex gap-2 items-center'>
                        <label htmlFor='from' className='text-[max(.85rem,3.3vw)] min-[450px]:text-[max(.95rem,2.3vw)] md:text-[max(1.05rem,1.6vw)] lg:text-[clamp(0.7125rem,0.3535rem+0.7172vw,1.85rem)] font-semibold text-gray-500'>From:</label>
                        <input onChange={(e) => setFrom(e.target.value)} className='text-[max(.5rem,2.3vw)] min-[450px]:text-[max(.65rem,1.8vw)] md:text-[max(.9rem,1.5vw)] lg:text-[clamp(0.625rem,-0.0307rem+1.0246vw,1.25rem)] border border-gray-500 rounded-md py-1 px-2' id='from' type="date" />
                    </span>
                    <span className='flex gap-2 items-center'>
                        <label htmlFor='to' className='text-[max(.85rem,3.3vw)] min-[450px]:text-[max(.95rem,2.3vw)] md:text-[max(1.05rem,1.6vw)] lg:text-[clamp(0.7125rem,0.3535rem+0.7172vw,1.85rem)] font-semibold text-gray-500'>To:</label>
                        <input onChange={(e) => setTo(e.target.value)} className='text-[max(.5rem,2.3vw)] min-[450px]:text-[max(.65rem,1.8vw)] md:text-[max(.9rem,1.5vw)] lg:text-[clamp(0.625rem,-0.0307rem+1.0246vw,1.25rem)] border border-gray-500 rounded-md py-1 px-2' id='to' type="date" />
                    </span>
                </span>
            </div>
            <div className="space-y-4">
                {RecentExpenseTransaction?.map((transaction) => (
                    <div key={transaction._id} className="flex flex-col gap-0.5 min-[375px]:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                            <div className=" bg-green-100 p-[.4rem] min-[450px]:p-[.40rem] md:p-[.50rem]  rounded-full flex items-center justify-center">
                                {
                                    transaction.Expense_Icon ? <img className='h-[max(1rem,6vw)] min-[450px]:h-[max(1.7rem,4vw)] md:h-[max(1.9rem,3.3vw)] lg:h-[clamp(0.9375rem,0.2818rem+1.0246vw,1.5625rem)] w-auto object-cover' src={transaction.Expense_Icon} /> : <IoMdTrendingUp className="text-green-600 h-[max(1rem,6vw)] min-[450px]:h-[max(1.7rem,4vw)] md:h-[max(1.9rem,3.3vw)] lg:h-[clamp(0.9375rem,0.2818rem+1.0246vw,1.5625rem)] w-auto" />

                                }

                            </div>
                            <div>
                                <p className="font-medium text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.4535rem+0.7172vw,1.85rem)]">{transaction.Expense_Category}</p>
                                <p className="text-[max(.75rem,3vw)] min-[450px]:text-[max(.85rem,1.8vw)] md:text-[max(1rem,1.2vw)] lg:text-[clamp(0.7125rem,0.1535rem+0.7172vw,1.85rem)] text-gray-600">{moment(transaction.Expense_Date).format("Do MMMM YYYY")}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-0.5 min-[450px]:flex-row items-center min-[450px]:gap-8' >
                            <span className='text-right text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.4535rem+0.7172vw,1.85rem)]'>
                                <p className="font-semibold text-green-600">+${transaction.Amount}</p>
                            </span>
                            <span className='flex  items-center gap-10 min-[375px]:gap-4 text-lg'>
                                <FaRegEdit onClick={() => onEditExpense(transaction._id)} className='text-gray-500 cursor-pointer' />
                                <RiDeleteBin6Line onClick={() => onDeleteExpense(transaction._id)} className='text-red-500 cursor-pointer' />

                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <EditExpenseForm EditExpenseData={EditExpenseData} setshowEditExpenseForm={setshowEditExpenseForm} showEditExpenseForm={showEditExpenseForm} />
            <DeleteExpense setShowDeleteExpensePage={setShowDeleteExpensePage} ShowDeleteExpensePage={ShowDeleteExpensePage} DeleteExpenseId={DeleteExpenseId} />
        </div>
    )
}

export default RecentExpenseTransaction