import React from 'react'
import { HiOutlineCalendar } from "react-icons/hi2";
import { IoMdTrendingUp } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";
import { useSelector } from 'react-redux';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
const AccountStatus = () => {
    const loginData = useSelector((state) => state?.auth?.user?.UserLastLogin?.lastLogin)
    const isEmailVerified = useSelector((state) => state?.auth?.user.user?.isEmailVerified)
    const lastTrans = useSelector((state) => state?.total_income_expense.Total_Income_Expense)
    
console.log(lastTrans.map((data)=>data).sort((a,b)=>b.Month-a.Month)[0]);


    return (
        <>
            <div className='bg-[#FFFFFF] min-w-[70vw] rounded-2xl p-4 md:p-6 shadow-xl w-full min-[450px]:max-w-4xl  md:max-w-7xl'>
                <h3 className='text-[max(1.05rem,4.2vw)] min-[450px]:text-[max(1.2rem,3vw)] md:text-[max(1.32rem,2.5vw)] lg:text-[clamp(0.8125rem,0.6535rem+0.7172vw,1.85rem)] font-semibold text-gray-900 mb-4'>Account Activity</h3>
                <div className='space-y-4'>
                    <div className='flex flex-col min-[450px]:flex-row items-center justify-between p-3 bg-gray-50 rounded-lg'>
                        <span className='flex items-center space-x-3 text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.4535rem+0.7172vw,1.85rem)]'>
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <HiOutlineCalendar className="h-4 w-4 text-blue-600" />
                            </div>
                            <h5 className='font-medium text-gray-900 '>Last Login</h5>
                        </span>
                        <p className="text-sm text-center lg:text-start text-gray-500">{moment(loginData).calendar()}</p>
                    </div>

                    <div className='flex flex-col min-[450px]:flex-row items-center justify-between p-3 bg-gray-50 rounded-lg'>
                        <span className='flex items-center space-x-3 text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.4535rem+0.7172vw,1.85rem)]'>
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <IoMdTrendingUp className="h-4 w-4 text-green-600" />
                            </div>
                            <h5 className='font-medium text-gray-900'>Last Transaction</h5>
                        </span>
                        <p className="text-sm text-center lg:text-start text-gray-500">{moment(lastTrans.map((data)=>data).sort((a,b)=>b.Month-a.Month)[0]?.updatedAt).fromNow()}</p>
                    </div>

                    <div className='flex flex-col min-[450px]:flex-row items-center justify-between p-3 bg-gray-50 rounded-lg'>
                        <span className='flex items-center space-x-3 text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.4535rem+0.7172vw,1.85rem)]'>
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex  items-center justify-center">
                                <MdOutlineMailOutline className="h-4 w-4 text-purple-600" />
                            </div>
                            <h5 className='font-medium text-gray-900'>Email Verification</h5>
                        </span>
                            {
                                isEmailVerified  ? 
                        <p className="text-sm text-[max(.75rem,3vw)] min-[450px]:text-[max(.95rem,2vw)] md:text-[max(1rem,1vw)] lg:text-[clamp(0.8125rem,0.2535rem+0.7172vw,1.85rem)] bg-[#DCFCE7] shadow-md rounded-4xl px-3 py-1 flex gap-2 items-center font-semibold">
                                    <FiCheckCircle className='text-[#15803D] ' />
                                    <span className='text-[#15803D] '>
                                        Verified
                                    </span>
                                
                        </p>
                                    :   <p className="text-sm text-[max(.75rem,3vw)] min-[450px]:text-[max(.95rem,2vw)] md:text-[max(1rem,1vw)] lg:text-[clamp(0.8125rem,0.4235rem+0.7172vw,1.85rem)] bg-[#FFE2E2] shadow-md rounded-4xl px-3 py-1 flex gap-2 items-center font-semibold">
                                        <IoAlertCircleOutline className='text-[#E7000B] h-4.5 w-4.5'/>
                                        <span className='text-[#E7000B] '>
                                            Not Verified
                                        </span>
                                    </p>
                                    
                            }

                    </div>

                    {/* <a href="" className=" bg-[#2563EB] font-medium  flex items-center gap-2 text-white shadow-lg shadow-[#2564eb8f] px-4 py-2 rounded-4xl text-sm">
                            <MdModeEdit className="w-5 h-5" />
                            <span> Edit Profile</span>
                        </a> */}


                </div>
            </div>

        </>
    )
}

export default AccountStatus