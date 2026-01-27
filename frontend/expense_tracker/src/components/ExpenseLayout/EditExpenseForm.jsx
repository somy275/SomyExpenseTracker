import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react"
import { CgImage } from "react-icons/cg";
import EmojiPicked from '../IncomeLayout/EmojiPick';
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment';
import { useNavigate } from "react-router"
import { EditExpense, getExpenses } from '../../Store/expenseSlice';
const EditExpenseForm = ({ EditExpenseData, setshowEditExpenseForm, showEditExpenseForm }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [Emoji, setEmoji] = useState("null")
    const [isEmojiOpen, setisEmojiOpen] = useState(false)
    const [emojiPickerShow, setemojiPickerShow] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { loading } = useSelector(state => state.expense)


    const onEmojiShow = () => {
        setemojiPickerShow(true)
        setisEmojiOpen(false)
    }
    const onIncomeEdit = async (data) => {
        const Userdata = {
            ...data, id: EditExpenseData[0]._id
        }
        const res = await dispatch(EditExpense(Userdata))
        // ref.current.reset()
        if (EditExpense.fulfilled.match(res)) {
            dispatch(getExpenses())
            navigate("/expenses");
            setshowEditExpenseForm(false)

        }
    }

    useEffect(() => {
        if (EditExpenseData && EditExpenseData.length > 0) {
            reset({
                Amount: EditExpenseData[0].Amount || "",
                Expense_Category: EditExpenseData[0].Expense_Category || "",
                Expense_Date: moment(EditExpenseData[0].Expense_Date).format("YYYY-MM-DD") || "",
                Expense_Desc: EditExpenseData[0].Expense_Desc ?? "",
                Expense_Icon: EditExpenseData[0].Expemse_Icon ?? ""
            });
            setEmoji(EditExpenseData[0].Expense_Icon || "null"); // prefill emoji
            setisEmojiOpen(EditExpenseData[0].Expense_Icon ? true : false)
        }
    }, [EditExpenseData, reset])
    return (
        showEditExpenseForm && (
            <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 '>
                <div className='bg-white p-6 rounded-xl shadow-2xl w-full max-w-md overflow-y-auto max-h-[95%]'>
                    <div className='flex justify-between items-center text-xl font-medium '>
                        <h3>Edit Income</h3>
                        <button onClick={() => setshowEditExpenseForm(false)} className='text-gray-500 text-2xl cursor-pointer' type="button">
                            <IoClose />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onIncomeEdit)} className='mt-6 flex flex-col justify-around gap-4'>
                        {
                            !isEmojiOpen ? <EmojiPicked setisEmojiOpen={setisEmojiOpen} setEmoji={setEmoji} setemojiPickerShow={setemojiPickerShow} emojiPickerShow={emojiPickerShow} /> : <span className='flex items-center gap-3 text-sm font-medium cursor-pointer max-w-fit' onClick={onEmojiShow}>
                                <img className='object-cover h-13 w-13 bg-[#F3E8FF] p-2 rounded-md shadow-xl' src={Emoji} />
                                <input type='hidden' value={Emoji} {...register("Expense_Icon")} name='Expense_Icon' alt='emoji' />
                                Change Icon
                            </span>
                        }
                        <div className='flex flex-col gap-1 '>
                            <label className='text-sm text-gray-600 font-medium' htmlFor='amount'>Amount</label>
                            <input    {...register("Amount", {
                                required: {
                                    value: true,
                                    message: "Amount is required"
                                }
                            })} className='border border-gray-300 p-1.5 pl-3 rounded-sm focus:outline-[#9810FA] text-[15px] text-gray-800' type='number' id='amount' name='Amount' placeholder='Enter amount' />
                            {errors && errors.Amount && <p className='block text-sm font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent  '>{errors.Amount.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <label className='text-sm text-gray-600 font-medium' htmlFor='category'>Category</label>
                            <select {...register("Expense_Category", {
                                required: {
                                    value: true,
                                    message: "Please select a category"
                                }
                            })} id='category' name='Expense_Category' className='border  border-gray-300 p-1.5 pl-3 rounded-sm focus:outline-[#9810FA] text-[15px] text-gray-800'>
                                <option value="">--Select--</option>
                                <option className=''>Food & Dining</option>
                                <option>Transportation</option>
                                <option>Entertainment</option>
                                <option>Shopping</option>
                                <option>Education</option>
                                <option>Bills & Utilities</option>
                                <option>Healthcare</option>
                                <option>Travel</option>
                                <option>Other</option>
                            </select>
                            {errors && errors.Expense_Category && <p className='block text-sm font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent  '>{errors.Income_Category.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <label className='text-sm text-gray-600 font-medium' htmlFor='date'>Date</label>
                            <input {...register("Expense_Date", {
                                required: {
                                    value: true,
                                    message: "Date is required"
                                }
                            })} className='border border-gray-300 p-1.5 pl-3 rounded-sm focus:outline-[#9810FA] text-[15px] text-gray-800' type='date' id='income' name='Income_Date' />
                            {errors && errors.Income_Date && <p className='block text-sm font-medium bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent  '>{errors.Income_Date.message}</p>}
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <label className='text-sm text-gray-600 font-medium' htmlFor='desc'>Description (Optional)</label>
                            <textarea {...register("Expense_Desc")} maxLength="25" cols="3" rows="0" className='border border-gray-300 p-1.5 pl-3 rounded-sm focus:outline-[#9810FA] text-[15px] text-gray-800 max-h-[70px] min-h-[40px]' id='desc' name='Income_Desc' placeholder="Add any notes..." />
                        </div>
                        <button disabled={loading} className='p-2 mt-3 cursor-pointer text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl  shadow-lg' type='submit'>
                            {
                                loading ? <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Editing...
                                </div> : "Edit Expense"
                            }
                        </button>
                    </form>
                </div>
            </div>
        )


    )
}

export default EditExpenseForm