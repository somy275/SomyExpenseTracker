import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { DeleteExpenseData, getExpenses } from '../../Store/expenseSlice'
import { GetTotalIncomeExpense } from '../../Store/TotalIncomeExpense'

const DeleteExpense = ({ setShowDeleteExpensePage, ShowDeleteExpensePage, DeleteExpenseId }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onDeleteData = async () => {
        const res = await dispatch(DeleteExpenseData(DeleteExpenseId))
        if (DeleteExpenseData.fulfilled.match(res)) {
            dispatch(getExpenses())
            dispatch(GetTotalIncomeExpense())
            navigate("/expenses");
            setShowDeleteExpensePage(false)
        }
    }
    return (
        ShowDeleteExpensePage && (
            <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50'>
                <div className='relative bg-white p-4 rounded-xl shadow-2xl w-full max-w-md overflow-y-auto max-h-[95%]'>
                    <div className='relative flex justify-between items-center text-md font-medium h-fit'>
                        <h3 className='text-md'>Delete Expense</h3>
                        <button className='text-gray-500 text-xl cursor-pointer' type='button'>
                            <IoClose onClick={() => setShowDeleteExpensePage(false)} />
                        </button>
                    </div>
                    <div className='absolute w-full h-fit left-0 right-0 bottom-[67%] border-b-[1.25px] border-b-gray-300'></div>
                    <div className='flex flex-col mt-5 gap-6'>
                        <h3 className='text-[.8rem] font-medium'>Are you sure you want to delete this expense detail?</h3>
                        <button onClick={onDeleteData} className='text-[.75rem] self-end px-5 py-2 cursor-pointer text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg  shadow-lg' type='button'>
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        )
    )
}

export default DeleteExpense