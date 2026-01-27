import React, { useState } from 'react'
import { SideBarItems } from '../../utils/SideBarItems'
import { NavLink, useNavigate } from "react-router"
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Store/authSlice';
const SideBar = ({ setactiveTab }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [SideBarOpen, setSideBarOpen] = useState(false)
    const logoutUserData = () => {
        const data = dispatch(logoutUser())
        if (data) {
            navigate("/login")
        }
    }
    return (
        <div className="flex h-screen bg-gray-50 relative z-[2]">
            {/* SideBar */}
            <div className={` ${SideBarOpen ? "w-[100vw] md:w-64" : "w-20 "} cursor-pointer bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col`}>
                <div className="p-4 border-b border-gray-200">
                    <div onClick={() => setSideBarOpen(!SideBarOpen)} className="flex   items-center space-x-3 gap-3">
                        <div className="inline-flex p-4 items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl  shadow-lg">
                            <span className="text-white text-2xl font-bold">€</span>
                        </div>
                        {SideBarOpen && (
                            <div>
                                <h1 className="font-bold text-gray-900">ExpenseTracker</h1>
                                <p className="text-xs text-gray-500">Financial Management</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Navigation */}
                <nav className='flex flex-col p-4'>
                    <ul className='space-y-3'>
                        {
                            SideBarItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <li className='w-[90%]'>
                                        <NavLink onClick={() => setactiveTab(item.label)}
                                            className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl  shadow-lg text-white" : ""}`} to={item.path}>
                                            <Icon className='h-5 w-5' />
                                            {SideBarOpen && <span className='font-medium '>{item.label}</span>}
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul >
                </nav>

                <div className="px-4 py-8 border-t  border-gray-200 absolute bottom-0 left-0 right-0">
                    <div className="flex items-center justify-center gap-3 ">
                        <div onClick={logoutUserData} className="w-[90%] md:w-full p-2 bg-red-400 hover:bg-red-500 text-white rounded-xl flex gap-3 items-center justify-center">
                            <FiLogOut />
                            {
                                SideBarOpen && <span className='font-medium'>Logout</span>
                            }

                        </div>

                    </div>
                </div>
            </div>

        </div >
    )
}

export default SideBar